Pod::Spec.new do |s|
  s.name = 'KostolanyAppIcon'
  s.version = '0.1.0'
  s.summary = 'Local Kostolany app icon adapter'
  s.description = 'Device app icon access for the local frontend prototype.'
  s.license = { :type => 'UNLICENSED' }
  s.author = 'Kostolany'
  s.homepage = 'https://kostolany.invalid'
  s.platforms = { :ios => '16.4' }
  s.swift_version = '5.9'
  s.source = { :path => '.' }
  s.static_framework = true
  s.dependency 'ExpoModulesCore'
  s.source_files = '**/*.swift'
end
