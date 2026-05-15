import { useState, useEffect } from 'react';
import { Activity, Droplet, Gauge as GaugeIcon, Fuel, AlertCircle } from 'lucide-react';
import { CircularGauge } from './CircularGauge';
import { LinearIndicator } from './LinearIndicator';

export function Dashboard() {
  const [rpm, setRpm] = useState(1450);
  const [temp, setTemp] = useState(78);
  const [pressure, setPressure] = useState(4.2);
  const [fuelFlow, setFuelFlow] = useState(220);

  useEffect(() => {
    const interval = setInterval(() => {
      setRpm(prev => prev + (Math.random() - 0.5) * 20);
      setTemp(prev => Math.min(95, Math.max(70, prev + (Math.random() - 0.5) * 2)));
      setPressure(prev => Math.min(5, Math.max(3.5, prev + (Math.random() - 0.5) * 0.1)));
      setFuelFlow(prev => prev + (Math.random() - 0.5) * 5);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const engineHealth = temp < 85 && pressure > 3.8 ? 95 : temp < 90 ? 78 : 62;
  const healthColor = engineHealth > 85 ? '#2ECC71' : engineHealth > 70 ? '#FF9F43' : '#FF4D4D';

  return (
    <div className="p-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-white/90">Engine Monitor</h1>
        <p className="text-sm text-white/50">Real-Time Marine Intelligence</p>
      </div>

      <div className="bg-gradient-to-br from-[#101A24] to-[#0E2A47] rounded-[20px] p-5 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider">Engine Health</p>
            <p className="text-white mt-1" style={{ fontSize: '36px', fontVariantNumeric: 'tabular-nums' }}>
              {Math.round(engineHealth)}%
            </p>
          </div>
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center" style={{ borderColor: healthColor }}>
              <Activity size={28} style={{ color: healthColor }} />
            </div>
            <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: healthColor }}></div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: healthColor }}></div>
          <span className="text-white/60">All Systems Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <CircularGauge
          label="RPM"
          value={rpm}
          max={2000}
          unit=""
          color="#00D1FF"
          icon={<GaugeIcon size={20} />}
        />
        <CircularGauge
          label="Temperature"
          value={temp}
          max={100}
          unit="°C"
          color={temp > 85 ? '#FF4D4D' : '#2ECC71'}
          icon={<Activity size={20} />}
        />
      </div>

      <div className="bg-[#101A24] rounded-[20px] p-4 border border-white/10 space-y-4">
        <LinearIndicator
          label="Oil Pressure"
          value={pressure}
          max={6}
          unit="bar"
          color="#00D1FF"
          icon={<Droplet size={18} />}
          warningThreshold={3.8}
        />
        <LinearIndicator
          label="Fuel Flow"
          value={fuelFlow}
          max={300}
          unit="L/h"
          color="#2ECC71"
          icon={<Fuel size={18} />}
        />
        <LinearIndicator
          label="Cooling Flow"
          value={80}
          max={100}
          unit="%"
          color="#00D1FF"
          icon={<Activity size={18} />}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#101A24] rounded-[16px] p-4 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-[#2ECC71] rounded-full animate-pulse"></div>
            <span className="text-white/60 text-xs">Lubrication</span>
          </div>
          <p className="text-white text-lg">Normal</p>
        </div>
        <div className="bg-[#101A24] rounded-[16px] p-4 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-[#2ECC71] rounded-full animate-pulse"></div>
            <span className="text-white/60 text-xs">Exhaust</span>
          </div>
          <p className="text-white text-lg">Normal</p>
        </div>
      </div>

      {temp > 85 && (
        <div className="bg-[#FF9F43]/10 border border-[#FF9F43]/30 rounded-[16px] p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-[#FF9F43] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[#FF9F43] font-medium text-sm">Temperature Warning</p>
            <p className="text-white/60 text-xs mt-1">Engine temperature approaching threshold</p>
          </div>
        </div>
      )}
    </div>
  );
}
