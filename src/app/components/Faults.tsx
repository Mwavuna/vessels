import { useState } from 'react';
import { AlertTriangle, AlertCircle, CheckCircle, Clock, ChevronDown } from 'lucide-react';

export function Faults() {
  const [expandedFault, setExpandedFault] = useState<string | null>(null);

  const activeFaults = [
    {
      id: '1',
      title: 'High Exhaust Temperature',
      severity: 'warning',
      source: 'Cylinder #3 Exhaust Sensor',
      time: '2 min ago',
      description: 'Exhaust temperature exceeded safe operating threshold of 400°C',
      action: 'Monitor engine load and reduce RPM if temperature continues to rise',
      value: '412°C',
      threshold: '400°C'
    }
  ];

  const recentFaults = [
    {
      id: '2',
      title: 'Cooling Pump Fluctuation',
      severity: 'resolved',
      source: 'Cooling System Monitor',
      time: '15 min ago',
      description: 'Temporary pressure drop detected in cooling water circuit',
      action: 'Issue resolved automatically. System returned to normal operation.',
      resolvedAt: '14 min ago'
    },
    {
      id: '3',
      title: 'Oil Pressure Warning',
      severity: 'resolved',
      source: 'Lubrication System',
      time: '1 hour ago',
      description: 'Oil pressure briefly dropped below 3.8 bar during startup',
      action: 'Normal startup sequence. Pressure stabilized within acceptable range.',
      resolvedAt: '58 min ago'
    }
  ];

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-[#FF4D4D]/10',
          border: 'border-[#FF4D4D]/30',
          text: 'text-[#FF4D4D]',
          icon: AlertTriangle,
          label: 'Critical',
          glow: 'shadow-[0_0_20px_rgba(255,77,77,0.3)]'
        };
      case 'warning':
        return {
          bg: 'bg-[#FF9F43]/10',
          border: 'border-[#FF9F43]/30',
          text: 'text-[#FF9F43]',
          icon: AlertCircle,
          label: 'Warning',
          glow: 'shadow-[0_0_15px_rgba(255,159,67,0.2)]'
        };
      case 'resolved':
        return {
          bg: 'bg-white/5',
          border: 'border-white/10',
          text: 'text-[#2ECC71]',
          icon: CheckCircle,
          label: 'Resolved',
          glow: ''
        };
      default:
        return {
          bg: 'bg-white/5',
          border: 'border-white/10',
          text: 'text-white/70',
          icon: AlertCircle,
          label: 'Info',
          glow: ''
        };
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-white/90">Fault Monitor</h1>
        <p className="text-sm text-white/50">Active alerts and history</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#FF9F43]/10 border border-[#FF9F43]/30 rounded-[16px] p-3 text-center">
          <p className="text-white text-[#FF9F43]" style={{ fontSize: '30px' }}>1</p>
          <p className="text-[10px] text-white/60 uppercase mt-1">Active</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-[16px] p-3 text-center">
          <p className="text-white/90" style={{ fontSize: '30px' }}>0</p>
          <p className="text-[10px] text-white/60 uppercase mt-1">Critical</p>
        </div>
        <div className="bg-[#2ECC71]/10 border border-[#2ECC71]/30 rounded-[16px] p-3 text-center">
          <p className="text-[#2ECC71]" style={{ fontSize: '30px' }}>2</p>
          <p className="text-[10px] text-white/60 uppercase mt-1">Resolved</p>
        </div>
      </div>

      {activeFaults.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-white/90 text-sm uppercase tracking-wider">Active Alerts</h2>
          {activeFaults.map((fault) => {
            const config = getSeverityConfig(fault.severity);
            const Icon = config.icon;
            const isExpanded = expandedFault === fault.id;

            return (
              <button
                key={fault.id}
                onClick={() => setExpandedFault(isExpanded ? null : fault.id)}
                className={`w-full ${config.bg} border ${config.border} ${config.glow} rounded-[16px] p-4 text-left transition-all active:scale-98`}
              >
                <div className="flex items-start gap-3">
                  <Icon size={20} className={`${config.text} flex-shrink-0 mt-0.5 ${fault.severity === 'warning' ? 'animate-pulse' : ''}`} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className={`${config.text} font-medium text-sm`}>{fault.title}</p>
                      <ChevronDown
                        size={16}
                        className={`text-white/30 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
                      <Clock size={12} />
                      <span>{fault.time}</span>
                    </div>
                    <p className="text-white/60 text-xs">{fault.source}</p>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                        <div>
                          <p className="text-white/50 text-[10px] uppercase mb-1">Description</p>
                          <p className="text-white/80 text-xs">{fault.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white/5 rounded-lg p-2">
                            <p className="text-white/50 text-[10px] uppercase">Current</p>
                            <p className={`${config.text} text-sm font-medium`}>{fault.value}</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-2">
                            <p className="text-white/50 text-[10px] uppercase">Threshold</p>
                            <p className="text-white/70 text-sm">{fault.threshold}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-white/50 text-[10px] uppercase mb-1">Recommended Action</p>
                          <p className="text-white/80 text-xs">{fault.action}</p>
                        </div>

                        <button className={`w-full ${config.bg} border ${config.border} rounded-lg py-2 ${config.text} text-sm font-medium active:scale-95 transition-transform`}>
                          Acknowledge Alert
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {recentFaults.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-white/90 text-sm uppercase tracking-wider">Recent History</h2>
          {recentFaults.map((fault) => {
            const config = getSeverityConfig(fault.severity);
            const Icon = config.icon;

            return (
              <div
                key={fault.id}
                className={`${config.bg} border ${config.border} rounded-[16px] p-4`}
              >
                <div className="flex items-start gap-3">
                  <Icon size={18} className={`${config.text} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <p className="text-white/90 font-medium text-sm mb-1">{fault.title}</p>
                    <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
                      <Clock size={12} />
                      <span>{fault.time}</span>
                      <span>•</span>
                      <span className={config.text}>Resolved {fault.resolvedAt}</span>
                    </div>
                    <p className="text-white/60 text-xs">{fault.source}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
