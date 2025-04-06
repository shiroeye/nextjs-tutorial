import Form from "@/app/ui/invoices/edit-form"
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data"

type Props = {
    params: Promise<{ id: string }>
}

export default async function Page(props: Props) {
    const params = await props.params;
    const id = params.id;

    // const invoice = await fetchInvoiceById(id);
    // const customers = await fetchCustomers();

    // ↑ Promise.allを使用して並列で処理することができる
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
    ]);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    {
                        label: 'Edit Invoice',
                        href: `/dashboard/invoices/${id}/edit`,
                        active: true,
                    }
                ]}
            />
            <Form invoice={invoice} customers={customers} />
        </main>
    );
}
