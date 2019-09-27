const gamma = 1.4;

exports = module.exports;

exports.isentropicFlow = function isentropicFlow(machNumber) {
    let result = {};
    result.totalPressureOverStaticPressure = Math.pow(Math.pow(machNumber, 2) * (gamma - 1) / 2 + 1, gamma / (gamma - 1));
    result.totalTempratureOverStaticTemprature = Math.pow(machNumber, 2) * (gamma - 1) / 2 + 1;
    result.totalDensityOverStaticDensity = Math.pow(Math.pow(machNumber, 2) * (gamma - 1) / 2 + 1, 1 / (gamma - 1));
    result.as = Math.pow(Math.pow(machNumber, 2) * (gamma - 1) / (gamma + 1) + 2 / (gamma + 1), (gamma + 1) / (2 * (gamma - 1))) / machNumber;
    return result;
}

exports.normalShock = function normalShock(machNumber) {
    let result = {};
    result.downstreamPressureOverUpstreamPressure = 1 + 2 * gamma * (Math.pow(machNumber, 2) - 1) / (gamma + 1);
    result.downstreamDensityOverUpstreamDensity = (gamma + 1) * (Math.pow(machNumber, 2)) / (2 + (gamma - 1) * (Math.pow(machNumber, 2)));
    result.downstreamTempratureOverUpstreamTemprature = result.downstreamPressureOverUpstreamPressure / result.downstreamDensityOverUpstreamDensity;
    result.downstreamMachNumber = Math.sqrt((1 + (gamma - 1) * (Math.pow(machNumber, 2)) / 2) / (gamma * (Math.pow(machNumber, 2)) - (gamma - 1) / 2));
    return result;
}

exports.obliqueShock = function obliqueShock(machNumber, flowAngle) {
    let result = {};
    let theta_rad = flowAngle * Math.PI / 180;
    let lambda = Math.sqrt(Math.pow(Math.pow(machNumber, 2) - 1, 2) - 3 * (1 + (gamma - 1) * Math.pow(machNumber, 2) / 2) * (1 + (gamma + 1) * Math.pow(machNumber, 2) / 2) * Math.pow(Math.tan(theta_rad), 2));
    let x = (Math.pow(Math.pow(machNumber, 2) - 1, 3) - 9 * (1 + (gamma - 1) * Math.pow(machNumber, 2) / 2) * (1 + (gamma - 1) * Math.pow(machNumber, 2) / 2 + (gamma + 1) * Math.pow(machNumber, 4) / 4) * Math.pow(Math.tan(theta_rad), 2)) / (Math.pow(lambda, 3));
    result.shockAngle = Math.atan((Math.pow(machNumber, 2) - 1 + 2 * lambda * Math.cos((4 * Math.PI + Math.acos(x)) / 3)) / (3 * (1 + (gamma - 1) * Math.pow(machNumber, 2) / 2) * Math.tan(theta_rad))) * 180 / Math.PI;
    let mn1 = machNumber * Math.sin(result.shockAngle * Math.PI / 180);
    result.downstreamPressureOverUpstreamPressure = 1 + 2 * gamma * (Math.pow(mn1, 2) - 1) / (gamma + 1);
    result.downstreamDensityOverUpstreamDensity = (gamma + 1) * (Math.pow(mn1, 2)) / (2 + (gamma - 1) * (Math.pow(mn1, 2)));
    result.downstreamTempratureOverUpstreamTemprature = result.downstreamPressureOverUpstreamPressure / result.downstreamDensityOverUpstreamDensity;
    result.downstreamMachNumber = Math.sqrt((1 + (gamma - 1) * (Math.pow(mn1, 2)) / 2) / (gamma * (Math.pow(mn1, 2)) - (gamma - 1) / 2)) / Math.sin((result.shockAngle - flowAngle) * Math.PI / 180);
    return result;
}

exports.expansionFan = function expansionFan(machNumber, flowAngle) {
    let result = {};
    result.upstreamPrandtlMeyerFunction = (Math.sqrt((gamma + 1) / (gamma - 1)) * Math.atan(Math.sqrt((gamma - 1) * (Math.pow(machNumber, 2) - 1) / (gamma + 1))) - Math.atan(Math.sqrt(Math.pow(machNumber, 2) - 1))) * 180 / Math.PI;
    result.downstreamPrandtlMeyerFunction = result.upstreamPrandtlMeyerFunction + flowAngle;
    let error = 10;
    let m_temp, nu_temp, downstreamMachNumber;
    for (i = 1; i <= 100; i++) {
        m_temp = 1 + i / 10;
        nu_temp = (Math.sqrt((gamma + 1) / (gamma - 1)) * Math.atan(Math.sqrt((gamma - 1) * (Math.pow(m_temp, 2) - 1) / (gamma + 1))) - Math.atan(Math.sqrt(Math.pow(m_temp, 2) - 1))) * 180 / Math.PI;
        if (Math.abs(nu_temp - result.downstreamPrandtlMeyerFunction) < error) {
            downstreamMachNumber = m_temp;
            error = Math.abs(nu_temp - result.downstreamPrandtlMeyerFunction);
        }
    }
    result.downstreamMachNumber = downstreamMachNumber;
    return result;
}

exports.help = function help() {
    return {
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
    }
}