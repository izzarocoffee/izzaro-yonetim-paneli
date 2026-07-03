import { prisma } from "@/lib/prisma";
import TedarikcilerPage from "../components/TedarikcilerPage";

export default async function Page() {
const suppliers = await prisma.supplier.findMany({
  include: {
    invoices: true,
    payments: true,
  },
  orderBy: {
    id: "desc",
  },
});
  const supplierCount = suppliers.length;

const totalCurrentDebt = suppliers.reduce((sum, supplier) => {
  const invoiceTotal = supplier.invoices.reduce(
    (s, i) => s + i.amount,
    0
  );

  const paymentTotal = supplier.payments.reduce(
    (s, p) => s + p.amount,
    0
  );

  return sum + supplier.oldDebt + invoiceTotal - paymentTotal;
}, 0);

 return (
  <TedarikcilerPage
    suppliers={suppliers}
    supplierCount={supplierCount}
    total0ldDebt={totalCurrentDebt}
  />
); 
}
