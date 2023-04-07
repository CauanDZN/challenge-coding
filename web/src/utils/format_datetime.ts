export function format_datetime(data: string) {
  const today_date = new Date(data)
  const date = `${today_date.getHours() < 10 ? "0" + today_date.getHours() : today_date.getHours()}:${today_date.getMinutes() < 10? "0" + today_date.getMinutes() : today_date.getMinutes()}`

  return date
}

export function format_date(data: string) {
  const today_date = new Date(data)
  const date = `${today_date.getDate() < 10? `0${today_date.getDate()}` : today_date.getDate()}/${(today_date.getMonth() + 1) < 10? `0${today_date.getMonth() + 1}` : today_date.getMonth() + 1}/${today_date.getFullYear()}`

  return date
}