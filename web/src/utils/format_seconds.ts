export function format_seconds(value: number) {
  return (value / 60) > 60 ? (value / 60 / 60).toFixed(0) + " horas e " + ((value / 60) % 60).toFixed(0) + " minutos" : (value / 60).toFixed(0) + " minutos"
}