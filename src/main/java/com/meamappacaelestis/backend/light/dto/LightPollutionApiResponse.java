package com.meamappacaelestis.backend.light.dto;

public class LightPollutionApiResponse {
    private Inner lightPollutionInfo;
    public Inner getLightPollutionInfo() { return lightPollutionInfo; }
    public void setLightPollutionInfo(Inner lightPollutionInfo) { this.lightPollutionInfo = lightPollutionInfo; }

    public static class Inner {
        private double value;
        public double getValue() { return value; }
        public void setValue(double value) { this.value = value; }
    }
}