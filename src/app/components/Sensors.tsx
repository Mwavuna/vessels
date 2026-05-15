import { useState } from 'react';
import { Thermometer, Gauge, Droplet, Wind, Flame, ChevronRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export function Sensors() {
  const [expandedSensor, setExpandedSensor] = useState<string | null>(null);

  const sensors = [
    {
      id: 'temp',
      name: 'Cylinder Temperature',
      value: 78.5,
      unit: '°C',
      status: 'normal',
      icon: <Thermometer size={20} />,
      color: '#2ECC71',
      data: [72, 74, 76, 75, 77, 78, 79, 78, 78.5]
    },
    {
      id: 'pressure',
      name: 'Oil Pressure',
      value: 4.2,
      unit: 'bar',
      status: 'normal',
      icon: <Droplet size={20} />,
      color: '#00D1FF',
      data: [4.1, 4.2, 4.3, 4.2, 4.1, 4.2, 4.3, 4.2, 4.2]
    },
    {
      id: 'rpm',
      name: 'Engine Speed',
      value: 1450,
      unit: 'RPM',
      status: 'normal',
      icon: <Gauge size={20} />,
      color: '#00D1FF',
      data: [1420, 1430, 1440, 1445, 1450, 1455, 1450, 1448, 1450]
    },
    {
      id: 'exhaust',
      name: 'Exhaust Temperature',
      value: 385,
      unit: '°C',
      status: 'normal',
      icon: <Flame size={20} />,
      color: '#FF9F43',
      data: [380, 382, 383, 384, 385, 386, 385, 384, 385]
    },
    {
      id: 'cooling',
      name: 'Cooling Water Flow',
      value: 82,
      unit: '%',
      status: 'normal',
      icon: <Wind size={20} />,
      color: '#00D1FF',
      data: [80, 81, 82, 81, 82, 83, 82, 81, 82]
    },
    {
      id: 'fuel-press',
      name: 'Fuel Pressure',
      value: 5.8,
      unit: 'bar',
      status: 'normal',
      icon: <Droplet size={20} />,
      color: '#2ECC71',
      data: [5.7, 5.8, 5.9, 5.8, 5.7, 5.8, 5.9, 5.8, 5.8]
    }
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-white/90">Sensor Monitor</h1>
        <p className="text-sm text-white/50">Real-time sensor readings</p>
      </div>

      <div className="space-y-3">
        {sensors.map((sensor) => {
          const isExpanded = expandedSensor === sensor.id;
          const chartData = sensor.data.map((value, i) => ({ value, index: i }));

          return (
            <button
              key={sensor.id}
              onClick={() => setExpandedSensor(isExpanded ? null : sensor.id)}
              className="w-full bg-[#101A24] rounded-[16px] p-4 border border-white/10 text-left transition-all active:scale-98"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-white/70">{sensor.icon}</div>
                  <div>
                    <p className="text-white text-sm font-medium">{sensor.name}</p>
                    <p className="text-white/50 text-xs mt-0.5">
                      Last update: {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-white text-lg" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {sensor.value}
                    </p>
                    <p className="text-white/50 text-xs">{sensor.unit}</p>
                  </div>
                  <ChevronRight
                    size={20}
                    className={`text-white/30 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                  />
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/60 text-xs">Historical Trend</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse"></div>
                      <span className="text-[#2ECC71] text-xs">Normal</span>
                    </div>
                  </div>

                  <div className="h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={sensor.color}
                          strokeWidth={2}
                          dot={false}
                          isAnimationActive={true}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="text-white/50 text-[10px] uppercase">Min</p>
                      <p className="text-white text-sm">{Math.min(...sensor.data).toFixed(1)}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="text-white/50 text-[10px] uppercase">Avg</p>
                      <p className="text-white text-sm">
                        {(sensor.data.reduce((a, b) => a + b, 0) / sensor.data.length).toFixed(1)}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="text-white/50 text-[10px] uppercase">Max</p>
                      <p className="text-white text-sm">{Math.max(...sensor.data).toFixed(1)}</p>
                    </div>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
