import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BlockMath } from "react-katex"

export function HeadingPositionCard() {
  return (
    <Card className="max-w-xl bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Heading and Position Updates</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Using yaw and trigonometry to compute new coordinates.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4 leading-relaxed">
        <p className="text-sm md:text-base text-muted-foreground pt-2">
          The aircraft's heading, known as <em>yaw</em>, is measured in degrees from North (clockwise).
          Since trigonometric functions require angles in radians, we convert yaw as follows:
        </p>

        <div className="text-sm md:text-base overflow-x-auto">
          <BlockMath math={String.raw`\theta = \text{yaw} \times \frac{\mathrm{\pi}}{180}`} />
        </div>

        <p className="text-sm md:text-base text-muted-foreground">
          Using trigonometry, the updated longitude and latitude positions are calculated as:
        </p>

        <div className="text-sm md:text-base overflow-x-auto">
          <BlockMath
            math={String.raw`\text{newLng} = \text{currentLng} + \text{lonDistancePerSecond} \times \cos(\theta)`} />
          <BlockMath
            math={String.raw`\text{newLat} = \text{currentLat} + \text{latDistancePerSecond} \times \sin(\theta)`} />
        </div>

        <p className="text-sm md:text-base text-muted-foreground">
          These calculations are repeated every 100 milliseconds, with the new position being added
          to a <code>GeoJSON</code> <em>LineString</em> for visualizing the trajectory.
        </p>

        <p className="text-sm md:text-base text-muted-foreground">
          The airplane icon is rotated accordingly to face the correct direction based on the yaw:
        </p>

        <div className="text-sm md:text-base overflow-x-auto">
          <BlockMath math={String.raw`\text{rotation} = -\text{yaw}`} />
        </div>

        <p className="text-sm md:text-base text-muted-foreground">
          Finally, the map is centered on the updated coordinates to ensure smooth visualization
          using the <code>flyTo()</code> method.
        </p>
      </CardContent>
    </Card>
  )
}

