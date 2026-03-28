'use client';

import { PlusIcon, SearchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArchiveProductDialog } from './archive-product-dialog';
import {
  type ProductRecord,
  type ProductStatus,
  productGradeOptions,
  productRecords,
  productStatusTabs,
} from './data';
import {
  ProductFormDialog,
  type ProductFormState,
} from './product-form-dialog';
import { ProductsTable } from './products-table';

const initialFormState: ProductFormState = {
  crop: '',
  variety: '',
  grade: productGradeOptions[0],
  location: '',
  quantity: '',
  unit: 'kg',
  expectedHarvest: '',
  askingPrice: '',
  notes: '',
};

export default function ProductsClient() {
  const [products, setProducts] = useState(productRecords);
  const [activeTab, setActiveTab] = useState<'All' | ProductStatus>('All');
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [productToArchive, setProductToArchive] =
    useState<ProductRecord | null>(null);
  const [form, setForm] = useState<ProductFormState>(initialFormState);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesTab = activeTab === 'All' || product.status === activeTab;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [product.crop, product.variety, product.location]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, products, search]);

  const stats = useMemo(
    () => [
      {
        label: 'Drafts',
        value: products.filter((product) => product.status === 'Draft').length,
      },
      {
        label: 'Active',
        value: products.filter((product) => product.status === 'Active').length,
      },
      {
        label: 'Sold',
        value: products.filter((product) => product.status === 'Sold').length,
      },
      {
        label: 'Archived',
        value: products.filter((product) => product.status === 'Archived')
          .length,
      },
    ],
    [products]
  );

  const openCreateSheet = () => {
    setEditingId(null);
    setForm(initialFormState);
    setDialogOpen(true);
  };

  const openEditSheet = (product: ProductRecord) => {
    setEditingId(product.id);
    setForm({
      crop: product.crop,
      variety: product.variety,
      grade: product.grade,
      location: product.location,
      quantity: String(product.quantity),
      unit: product.unit,
      expectedHarvest: product.expectedHarvest,
      askingPrice: product.askingPrice ? String(product.askingPrice) : '',
      notes: product.notes,
    });
    setDialogOpen(true);
  };

  const updateForm = <K extends keyof ProductFormState>(
    key: K,
    value: ProductFormState[K]
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const saveProduct = (nextStatus: 'Draft' | 'Active') => {
    const crop = form.crop.trim();
    const variety = form.variety.trim();
    const location = form.location.trim();
    const quantity = Number(form.quantity);
    const askingPrice = form.askingPrice ? Number(form.askingPrice) : undefined;

    if (
      !crop ||
      !location ||
      !form.expectedHarvest ||
      Number.isNaN(quantity) ||
      quantity <= 0
    ) {
      toast.error(
        'Please complete crop, location, quantity, and harvest date.'
      );
      return;
    }

    const payload: ProductRecord = {
      id: editingId ?? `prd-${Date.now()}`,
      crop,
      variety: variety || 'General lot',
      grade: form.grade,
      location,
      quantity,
      unit: form.unit,
      expectedHarvest: form.expectedHarvest,
      askingPrice,
      status: nextStatus,
      isPublished: nextStatus === 'Active',
      updatedAt: 'Just now',
      notes: form.notes.trim(),
      imageSrc: '/farm.jpg',
    };

    setProducts((current) => {
      if (editingId) {
        return current.map((product) =>
          product.id === editingId ? payload : product
        );
      }

      return [payload, ...current];
    });

    setDialogOpen(false);
    setEditingId(null);
    setForm(initialFormState);
    toast.success(
      nextStatus === 'Active'
        ? 'Product published to your local marketplace view.'
        : 'Product saved as draft.'
    );
  };

  const togglePublish = (product: ProductRecord) => {
    setProducts((current) =>
      current.map((item) =>
        item.id === product.id
          ? {
              ...item,
              status: item.isPublished ? 'Draft' : 'Active',
              isPublished: !item.isPublished,
              updatedAt: 'Just now',
            }
          : item
      )
    );

    toast.success(
      product.isPublished
        ? `${product.crop} moved back to draft.`
        : `${product.crop} is now active in marketplace.`
    );
  };

  const confirmArchiveProduct = (product: ProductRecord) => {
    setProducts((current) =>
      current.map((item) =>
        item.id === product.id
          ? {
              ...item,
              status: 'Archived',
              isPublished: false,
              updatedAt: 'Just now',
            }
          : item
      )
    );

    setProductToArchive(null);
    toast.success(`${product.crop} archived.`);
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-2xl text-foreground">Products</h1>
          <p className="text-muted-foreground text-sm">
            Manage your crop records and decide which ones go public.
          </p>
        </div>

        <Button onClick={openCreateSheet}>
          <PlusIcon data-icon="inline-start" />
          Add Product
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader className="gap-4 border-b">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Tabs
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as 'All' | ProductStatus)
              }
            >
              <TabsList>
                {productStatusTabs.map((tab) => (
                  <TabsTrigger key={tab} value={tab}>
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="relative min-w-0 lg:w-72">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search crop or location"
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-0">
          {filteredProducts.length > 0 ? (
            <ProductsTable
              products={filteredProducts}
              onEdit={openEditSheet}
              onTogglePublish={togglePublish}
              onArchive={setProductToArchive}
            />
          ) : (
            <div className="px-6 py-10">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <SearchIcon />
                  </EmptyMedia>
                  <EmptyTitle>No products found</EmptyTitle>
                  <EmptyDescription>
                    Adjust the current tab or search to find a saved product.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          )}
        </CardContent>
      </Card>

      <ProductFormDialog
        open={dialogOpen}
        editing={editingId !== null}
        form={form}
        onOpenChange={setDialogOpen}
        onChange={updateForm}
        onSaveDraft={() => saveProduct('Draft')}
        onPublish={() => saveProduct('Active')}
      />

      <ArchiveProductDialog
        product={productToArchive}
        open={productToArchive !== null}
        onOpenChange={(open) => {
          if (!open) {
            setProductToArchive(null);
          }
        }}
        onConfirm={() => {
          if (productToArchive) {
            confirmArchiveProduct(productToArchive);
          }
        }}
      />
    </div>
  );
}
