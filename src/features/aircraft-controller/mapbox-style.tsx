import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface MapboxStyleProps {
  value: string
  onChange: (value: string) => void
}

export function MapboxStyle({ value, onChange }: MapboxStyleProps) {
  return (
    <RadioGroup
      defaultValue="satellite"
      value={value}
      onValueChange={onChange}
      className="p-2 space-y-4"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="satellite" id="r1" />
        <Label htmlFor="r1" className="text-card-foreground">Satellite</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="dark" id="r2" />
        <Label htmlFor="r2" className="text-card-foreground">Dark</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="streets" id="r3" />
        <Label htmlFor="r3" className="text-card-foreground">Street</Label>
      </div>
    </RadioGroup>
  )
}

export default MapboxStyle
