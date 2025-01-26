import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MapboxAirplane from "@/features/aircraft-controller/mapbox-airplane";
import MapboxStyle from "./mapbox-style";
import { MapboxStyleKey } from "@/constants/mapbox-constants";
import { FlightSimulationOverview } from "./cards/flight-overview";
import Callout from "@/components/callout";
import { HeadingPositionCard } from "./cards/heading-position";
import { AirspeedDistanceCard } from "./cards/airspeed-distance";

export default function Dashboard() {
  const [yaw, setYaw] = useState<number>(0);
  const [airspeed, setAirspeed] = useState<number>(450);
  const [mapStyle, setMapStyle] = useState<MapboxStyleKey>("satellite");

  return (
    <div className="flex flex-col md:flex">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center md:text-left">
          Layup F22 Aircraft Controller
        </h2>
        <Tabs defaultValue="controller" className="space-y-4">
          <TabsList>
            <TabsTrigger value="controller">Aircraft Controller</TabsTrigger>
            <TabsTrigger value="design">Controller Design</TabsTrigger>
          </TabsList>
          <TabsContent value="controller" className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="dark:bg-gradient-to-br from-slate-700 to-slate-900 text-slate-100">
                  <CardHeader>
                    <CardTitle>Airplane Canvas</CardTitle>
                    <CardDescription>Display for aircraft trajectory</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MapboxAirplane yaw={yaw} airspeed={airspeed} mapStyle={mapStyle} />
                  </CardContent>
                </Card>
                <Card className="dark:bg-gradient-to-br from-slate-700 to-slate-900 text-slate-100">
                  <CardHeader>
                    <CardTitle>Airplane Controls</CardTitle>
                    <CardDescription>
                      Control the airplanes yaw angle and airspeed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground">
                          Yaw Angle
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={yaw}
                          onChange={(e) => setYaw(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="text-card-foreground">{yaw}°</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground">
                          Airspeed
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="1200"
                          value={airspeed}
                          onChange={(e) => setAirspeed(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="text-card-foreground">{airspeed} knots</div>
                      </div>
                    </div>
                    <div className="mt-8 md:mt-12">
                      <div className="font-semibold leading-none tracking-tight pb-2 text-card-foreground">
                        Mapbox Styles
                      </div>
                      <Callout
                        className="mt-2"
                        type="warning"
                        title="Warning"
                        message="Changing the style of the map will remove the trajectory until refresh"
                      />
                      <MapboxStyle value={mapStyle} onChange={(v) => setMapStyle(v as MapboxStyleKey)} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="design" className="space-y-4">
            <Card className="dark:bg-gradient-to-br from-slate-700 to-slate-900 text-slate-100">
              <CardHeader>
                <CardTitle>Aircraft Controller Design</CardTitle>
                <CardDescription>Description of aircraft trajectory calculations</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row justify-between gap-4 w-full">
                <FlightSimulationOverview />
                <AirspeedDistanceCard />
                <HeadingPositionCard />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

