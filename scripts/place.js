const temperature = 8;
const windSpeed = 10;

function calculateWindChill(temperature, windSpeed) {
    return 13.12 + 0.6215 * temperature - 11.37 * windSpeed ** 0.16 + 0.3965 * temperature * windSpeed ** 0.16;
}

const windChill = temperature <= 10 && windSpeed > 4.8
    ? `${calculateWindChill(temperature, windSpeed).toFixed(1)} °C`
    : "N/A";

document.getElementById("temperature").textContent = temperature;
document.getElementById("wind-speed").textContent = windSpeed;
document.getElementById("wind-chill").textContent = windChill;
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;
