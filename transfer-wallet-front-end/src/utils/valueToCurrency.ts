export default function valueToCurrency(value: number) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const corrector = 100;

  return formatter.format(value / corrector);
}
