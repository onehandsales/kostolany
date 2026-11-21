import ExpoModulesCore
import UIKit

public class KostolanyAppIconModule: Module {
  private let icons = ["wordmark-black", "wordmark-white", "founder-black", "founder-white", "friend", "throwback-2012", "throwback-2015", "throwback-2017"]
  private var changing = false

  private func snapshot() -> [String: Any] {
    let name = UIApplication.shared.alternateIconName
    let index = name == nil ? 0 : name.flatMap { $0.hasPrefix("KostolanyIcon") ? Int($0.dropFirst("KostolanyIcon".count)) : nil }
    let id: Any = index.flatMap { icons.indices.contains($0) ? icons[$0] : nil } as Any? ?? NSNull()
    return ["supported": UIApplication.shared.supportsAlternateIcons, "applied": id]
  }

  public func definition() -> ModuleDefinition {
    Name("KostolanyAppIcon")
    AsyncFunction("read") { () -> [String: Any] in self.snapshot() }.runOnQueue(.main)
    AsyncFunction("apply") { (id: String, promise: Promise) in
      guard let index = self.icons.firstIndex(of: id), UIApplication.shared.supportsAlternateIcons,
        UIApplication.shared.applicationState == .active, !self.changing else {
        promise.reject("ERR_ICON_UNAVAILABLE", "Icon change is unavailable")
        return
      }
      self.changing = true
      UIApplication.shared.setAlternateIconName(index == 0 ? nil : "KostolanyIcon\(index)") { error in
        // UIKit 완료 큐와 관계없이 상태 조회와 다음 변경 허용은 메인 큐에서 수행한다.
        DispatchQueue.main.async {
          self.changing = false
          if let error { promise.reject(error) } else { promise.resolve(self.snapshot()) }
        }
      }
    }.runOnQueue(.main)
  }
}
