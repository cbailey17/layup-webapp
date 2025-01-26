import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function FlightSimulationOverview() {
  return (
    <Card className="max-w-xl bg-card text-card-foreground">
      <CardHeader>
        <CardTitle>Flight Simulation Overview</CardTitle>
        <CardDescription>
          Understanding inputs and fundamental concepts driving the simulation.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4 leading-relaxed">
        <p className="text-sm text-muted-foreground pt-2">
          This simulation calculates the airplane's position on the map based on the following inputs:
        </p>

        <ul className="list-disc pl-5 text-sm text-muted-foreground">
          <li>
            <strong>Airspeed (knots):</strong> The speed of the aircraft in nautical miles per hour (NM/hr).
          </li>
          <li>
            <strong>Yaw (degrees):</strong> The direction the airplane is heading, measured clockwise from North.
          </li>
          <li>
            <strong>Current Latitude and Longitude (degrees):</strong> The aircraft’s position on Earth.
          </li>
          <li>
            <strong>Time Interval:</strong> The simulation updates every 100 milliseconds.
          </li>
        </ul>

        <p className="text-sm text-muted-foreground">
          Our goal is to simulate accurate movement of an F‑22 Raptor on a 2D map, adjusting position
          dynamically based on airspeed and yaw. Calculations take Earth's curvature into account
          to ensure realistic trajectory visualization.
        </p>
      </CardContent>
    </Card>
  )
}

