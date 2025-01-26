import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { InlineMath, BlockMath } from "react-katex"

export function AirspeedDistanceCard() {
  return (
    <Card className="max-w-xl bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Airspeed and Distance Calculation</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Converting airspeed to real-world map distances.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4 leading-relaxed">
        <p className="text-sm text-muted-foreground pt-2">
          The airspeed of the aircraft is given in <strong>knots</strong>, where 1 knot equals
          1 nautical mile per hour (NM/hr). To convert this to <strong>nautical miles per second</strong>, we use:
        </p>

        <div className="text-sm md:text-base overflow-x-auto">
          <BlockMath math={String.raw`\text{speedPerSecond} = \frac{\text{airspeed (knots)}}{3600}`} />
        </div>

        <p className="text-sm text-muted-foreground">
          Since 1 degree of latitude equals approximately <InlineMath>60</InlineMath> nautical miles,
          the corresponding movement in degrees per second is:
        </p>

        <div className="text-sm md:text-base overflow-x-auto">
          <BlockMath math={String.raw`\text{latDistancePerSecond} = \frac{\text{speedPerSecond}}{60}`} />
        </div>

        <p className="text-sm text-muted-foreground">
          However, longitude lines converge as latitude increases, meaning the distance covered per
          degree of longitude shrinks. To correct for this, we divide by the cosine of the latitude in radians:
        </p>

        <div className="text-sm md:text-base overflow-x-auto">
          <BlockMath
            math={String.raw`\text{lonDistancePerSecond} = \frac{\text{latDistancePerSecond}}{\cos\left(\text{currentLat} \times \frac{\mathrm{\pi}}{180}\right)}`}
          />
        </div>

        <p className="text-sm text-muted-foreground">
          This ensures accurate positional updates even when flying near the poles.
        </p>
      </CardContent>
    </Card>
  )
}
