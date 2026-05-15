import { useState } from 'react';
import { Moon, Sun, Bell, Sliders, Database, User, Info, ChevronRight, Power } from 'lucide-react';

export function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: darkMode ? <Moon size={20} /> : <Sun size={20} />,
          label: 'Dark Mode',
          value: darkMode ? 'Enabled' : 'Disabled',
          action: () => setDarkMode(!darkMode),
          toggle: true,
          checked: darkMode
        }
      ]
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: <Bell size={20} />,
          label: 'Push Notifications',
          value: notifications ? 'On' : 'Off',
          action: () => setNotifications(!notifications),
          toggle: true,
          checked: notifications
        },
        {
          icon: <Bell size={20} />,
          label: 'Critical Alerts',
          value: criticalAlerts ? 'Enabled' : 'Disabled',
          action: () => setCriticalAlerts(!criticalAlerts),
          toggle: true,
          checked: criticalAlerts
        }
      ]
    },
    {
      title: 'System',
      items: [
        {
          icon: <Sliders size={20} />,
          label: 'Sensor Calibration',
          value: 'Configure',
          hasChevron: true
        },
        {
          icon: <Database size={20} />,
          label: 'Data Refresh',
          value: '2 seconds',
          hasChevron: true
        },
        {
          icon: <Power size={20} />,
          label: 'Simulation Mode',
          value: 'Active',
          hasChevron: true
        }
      ]
    },
    {
      title: 'Account',
      items: [
        {
          icon: <User size={20} />,
          label: 'Profile',
          value: 'Marine Engineer',
          hasChevron: true
        },
        {
          icon: <Info size={20} />,
          label: 'About',
          value: 'v1.0.2',
          hasChevron: true
        }
      ]
    }
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="pt-2">
        <h1 className="text-white/90">Settings</h1>
        <p className="text-sm text-white/50">Configure your preferences</p>
      </div>

      <div className="bg-gradient-to-br from-[#00D1FF]/20 to-[#0E2A47]/20 border border-[#00D1FF]/30 rounded-[20px] p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#00D1FF]/20 rounded-full flex items-center justify-center border-2 border-[#00D1FF]/50">
            <User size={28} className="text-[#00D1FF]" />
          </div>
          <div>
            <p className="text-white text-lg font-medium">John Anderson</p>
            <p className="text-white/60 text-sm">Marine Systems Engineer</p>
            <p className="text-[#00D1FF] text-xs mt-1">License: ME-2024-4512</p>
          </div>
        </div>
      </div>

      {settingsSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-3">
          <h2 className="text-white/90 text-sm uppercase tracking-wider px-1">{section.title}</h2>
          <div className="bg-[#101A24] rounded-[16px] border border-white/10 overflow-hidden">
            {section.items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                onClick={item.action}
                className={`w-full flex items-center justify-between p-4 text-left transition-colors active:bg-white/5 ${
                  itemIndex !== section.items.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-white/70">{item.icon}</div>
                  <span className="text-white/90 text-sm">{item.label}</span>
                </div>

                <div className="flex items-center gap-3">
                  {item.toggle ? (
                    <div
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        item.checked ? 'bg-[#00D1FF]' : 'bg-white/20'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          item.checked ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </div>
                  ) : (
                    <>
                      <span className="text-white/50 text-sm">{item.value}</span>
                      {item.hasChevron && <ChevronRight size={18} className="text-white/30" />}
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center space-y-2 pt-4">
        <p className="text-white/90 font-medium">Marine Engine Monitor</p>
        <p className="text-white/50 text-xs">Real-Time Marine Intelligence</p>
        <p className="text-white/30 text-xs">Version 1.0.2 • Build 2024.05</p>
      </div>

      <button className="w-full bg-[#FF4D4D]/10 border border-[#FF4D4D]/30 rounded-[16px] py-3 text-[#FF4D4D] text-sm font-medium active:scale-95 transition-transform">
        Sign Out
      </button>
    </div>
  );
}
