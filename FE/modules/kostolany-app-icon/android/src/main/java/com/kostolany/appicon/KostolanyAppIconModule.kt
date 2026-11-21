package com.kostolany.appicon

import android.content.ComponentName
import android.content.pm.PackageManager
import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class KostolanyAppIconModule : Module() {
  private val icons = listOf("wordmark-black", "wordmark-white", "founder-black", "founder-white", "friend", "throwback-2012", "throwback-2015", "throwback-2017")
  private val lock = Any()
  private fun context() = requireNotNull(appContext.reactContext)
  private fun component(index: Int) = ComponentName(context().packageName, "${context().packageName}.KostolanyIcon$index")
  private fun snapshot(): Map<String, Any?> {
    val manager = context().packageManager
    val configured = icons.indices.all { index ->
      try { manager.getActivityInfo(component(index), PackageManager.MATCH_DISABLED_COMPONENTS); true }
      catch (_: PackageManager.NameNotFoundException) { false }
    }
    if (!configured) return mapOf("supported" to false, "applied" to null)
    val enabled = icons.indices.filter { index ->
      val state = manager.getComponentEnabledSetting(component(index))
      state == PackageManager.COMPONENT_ENABLED_STATE_ENABLED || index == 0 && state == PackageManager.COMPONENT_ENABLED_STATE_DEFAULT
    }
    return mapOf("supported" to true, "applied" to enabled.singleOrNull()?.let { icons[it] })
  }
  override fun definition() = ModuleDefinition {
    Name("KostolanyAppIcon")
    AsyncFunction("read") { synchronized(lock) { snapshot() } }
    AsyncFunction("apply") { id: String -> synchronized(lock) {
      val selected = icons.indexOf(id)
      check(selected >= 0 && snapshot()["supported"] == true && appContext.currentActivity != null)
      val manager = context().packageManager
      val previous = icons.indices.map { manager.getComponentEnabledSetting(component(it)) }
      try {
        if (Build.VERSION.SDK_INT >= 33) {
          manager.setComponentEnabledSettings(icons.indices.map { index ->
            PackageManager.ComponentEnabledSetting(component(index), if (index == selected) PackageManager.COMPONENT_ENABLED_STATE_ENABLED else PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP)
          })
        } else {
          // 구형 Android에서는 새 진입점을 먼저 켜서 런처 진입점이 없는 중간 상태를 피한다.
          manager.setComponentEnabledSetting(component(selected), PackageManager.COMPONENT_ENABLED_STATE_ENABLED, PackageManager.DONT_KILL_APP)
          icons.indices.filter { it != selected }.forEach { manager.setComponentEnabledSetting(component(it), PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP) }
        }
      } catch (error: Exception) {
        icons.indices.forEach { index ->
          try { manager.setComponentEnabledSetting(component(index), previous[index], PackageManager.DONT_KILL_APP) }
          catch (_: Exception) { }
        }
        throw error
      }
      snapshot()
    } }
  }
}
