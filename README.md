# supersonic-flow
This package calculates properties of the supersonic flow.

## Install
```
npm install supersonic-flow
```

## Contains:
• Isentropic Flow Properties Calculator

Gives total pressure, density, temperature and ... in terms of mach number

• Normal Shock Properties Calculator

Gives downstream pressure, density, temperature and mach number in terms of upstream mach number

• Oblique Shock Properties Calculator

Gives shock angle in terms of upstream mach number and stream angle

• Expansion Fan Properties Calculator

Gives prandtl-meyer function in terms of mach number

## Properties

```
        description: {
            machNumber: '(Upstream) Mach Number',
            flowAngle: 'Flow Angle',
            totalPressureOverStaticPressure: 'Total Pressure / Static Pressure',
            totalTempratureOverStaticTemprature: 'Total Temprature / Static Temprature',
            totalDensityOverStaticDensity: 'Total Density / Static Density',
            as: 'a/as',
            downstreamPressureOverUpstreamPressure: 'Downstream Pressure / Upstream Pressure',
            downstreamDensityOverUpstreamDensity: 'Downstream Density / Upstream Density',
            downstreamTempratureOverUpstreamTemprature: 'Downstream Temprature / Upstream Temprature',
            downstreamMachNumber: 'Downstream Mach Number',
            shockAngle: 'Shock Angle (Beta-deg)',
            upstreamPrandtlMeyerFunction: 'Upstream Prandtl-Meyer function (deg)',
            downstreamPrandtlMeyerFunction: 'Downstream Prandtl-Meyer function (deg)'
        },
        symbols: {
            machNumber: 'M(1)',
            flowAngle: 'θ (deg)',
            totalPressureOverStaticPressure: 'P0/P',
            totalTempratureOverStaticTemprature: 'T0/T',
            totalDensityOverStaticDensity: 'ρ0/ρ',
            as: 'A/A*',
            downstreamPressureOverUpstreamPressure: 'P2/P1',
            downstreamDensityOverUpstreamDensity: 'ρ2/ρ1',
            downstreamTempratureOverUpstreamTemprature: 'T2/T1',
            downstreamMachNumber: 'M2',
            shockAngle: 'β (deg)',
            upstreamPrandtlMeyerFunction: 'ϑ1 (deg)',
            downstreamPrandtlMeyerFunction: 'ϑ2 (deg)'
        }
```
