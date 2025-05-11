
import { useState, useEffect } from "react";
import { Cloud, CloudSun, Sun, CloudRain, CloudSnow, CloudLightning, Wind } from "lucide-react";

interface WeatherData {
  condition: "sunny" | "partly-cloudy" | "cloudy" | "rainy" | "snowy" | "stormy" | "windy";
  temperature: number;
  location: string;
}

const SidebarWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // This would typically be an API call to a weather service
    const fetchWeather = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - in a real app, this would come from a weather API
      const conditions: WeatherData["condition"][] = [
        "sunny", "partly-cloudy", "cloudy", "rainy", "snowy", "stormy", "windy"
      ];
      
      const mockWeather: WeatherData = {
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        temperature: Math.floor(Math.random() * 25) + 5, // Random temp between 5-30°C
        location: "Writer's Haven"
      };
      
      setWeather(mockWeather);
      setIsLoading(false);
    };
    
    fetchWeather();
  }, []);
  
  const getWeatherIcon = () => {
    if (!weather) return <Cloud className="h-6 w-6" />;
    
    switch (weather.condition) {
      case "sunny":
        return <Sun className="h-6 w-6 text-amber-500" />;
      case "partly-cloudy":
        return <CloudSun className="h-6 w-6 text-amber-400" />;
      case "cloudy":
        return <Cloud className="h-6 w-6 text-slate-400" />;
      case "rainy":
        return <CloudRain className="h-6 w-6 text-blue-400" />;
      case "snowy":
        return <CloudSnow className="h-6 w-6 text-blue-300" />;
      case "stormy":
        return <CloudLightning className="h-6 w-6 text-purple-400" />;
      case "windy":
        return <Wind className="h-6 w-6 text-slate-400" />;
    }
  };
  
  const getWeatherDescription = () => {
    if (!weather) return "Loading weather...";
    
    let description = weather.condition;
    // Capitalize first letter
    return description.charAt(0).toUpperCase() + description.slice(1);
  };
  
  if (isLoading) {
    return (
      <div className="p-3 flex items-center justify-center">
        <div className="animate-pulse flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-muted/50"></div>
          <div className="space-y-2">
            <div className="h-3 w-16 bg-muted/50 rounded"></div>
            <div className="h-2 w-10 bg-muted/50 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-3">
      <div className="flex items-center justify-between px-3 py-2 rounded-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/50">
        <div className="flex items-center gap-3">
          {getWeatherIcon()}
          <div>
            <div className="font-medium text-sm">
              {getWeatherDescription()}
            </div>
            <div className="text-xs text-muted-foreground">
              {weather?.location}
            </div>
          </div>
        </div>
        <div className="text-lg font-semibold">
          {weather?.temperature}°C
        </div>
      </div>
    </div>
  );
};

export default SidebarWeather;
