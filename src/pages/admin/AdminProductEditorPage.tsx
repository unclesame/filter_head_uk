import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, X, Save, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const CATEGORIES = [
  { value: 'inline-filter', label: 'Inline Filter' },
  { value: 'handheld', label: 'Handheld Filter' },
  { value: 'fixed', label: 'Fixed Head Filter' },
  { value: 'dual', label: 'Dual System' },
  { value: 'tap-filter', label: 'Tap Filter' },
  { value: 'bath-filter', label: 'Bath Filter' },
  { value: 'replacement', label: 'Replacement Cartridge' },
];

const INPUT_CLASS =
  'w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500';

interface FormData {
  name: string;
  slug: string;
  short_description: string;
  description: string;
  price: string;
  original_price: string;
  image_url: string;
  images: string[];
  category: string;
  features: string[];
  specifications: { key: string; value: string }[];
  stock_quantity: string;
  is_best_seller: boolean;
  is_featured: boolean;
}

const EMPTY_FORM: FormData = {
  name: '',
  slug: '',
  short_description: '',
  description: '',
  price: '',
  original_price: '',
  image_url: '',
  images: [],
  category: '',
  features: [''],
  specifications: [{ key: '', value: '' }],
  stock_quantity: '50',
  is_best_seller: false,
  is_featured: false,
};

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function AdminProductEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data, error: fetchErr } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (fetchErr || !data) {
        setError('Product not found');
        setLoading(false);
        return;
      }

      const specs = data.specifications as Record<string, string> ?? {};
      setForm({
        name: data.name ?? '',
        slug: data.slug ?? '',
        short_description: data.short_description ?? '',
        description: data.description ?? '',
        price: String(data.price ?? ''),
        original_price: data.original_price ? String(data.original_price) : '',
        image_url: data.image_url ?? '',
        images: (data.images as string[]) ?? [],
        category: data.category ?? '',
        features: (data.features as string[])?.length ? (data.features as string[]) : [''],
        specifications: Object.keys(specs).length
          ? Object.entries(specs).map(([key, value]) => ({ key, value }))
          : [{ key: '', value: '' }],
        stock_quantity: String(data.stock_quantity ?? 0),
        is_best_seller: data.is_best_seller ?? false,
        is_featured: data.is_featured ?? false,
      });
      setAutoSlug(false);
      setLoading(false);
    })();
  }, [id]);

  function updateField(field: keyof FormData, value: unknown) {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'name' && autoSlug) {
        next.slug = toSlug(value as string);
      }
      return next;
    });
  }

  function updateFeature(idx: number, value: string) {
    setForm(prev => {
      const features = [...prev.features];
      features[idx] = value;
      return { ...prev, features };
    });
  }

  function addFeature() {
    setForm(prev => ({ ...prev, features: [...prev.features, ''] }));
  }

  function removeFeature(idx: number) {
    setForm(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== idx) }));
  }

  function updateSpec(idx: number, field: 'key' | 'value', value: string) {
    setForm(prev => {
      const specifications = [...prev.specifications];
      specifications[idx] = { ...specifications[idx], [field]: value };
      return { ...prev, specifications };
    });
  }

  function addSpec() {
    setForm(prev => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }],
    }));
  }

  function removeSpec(idx: number) {
    setForm(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== idx),
    }));
  }

  function addImage() {
    setForm(prev => ({ ...prev, images: [...prev.images, ''] }));
  }

  function updateImage(idx: number, value: string) {
    setForm(prev => {
      const images = [...prev.images];
      images[idx] = value;
      return { ...prev, images };
    });
  }

  function removeImage(idx: number) {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const features = form.features.filter(f => f.trim());
    const specifications: Record<string, string> = {};
    form.specifications.forEach(s => {
      if (s.key.trim() && s.value.trim()) specifications[s.key.trim()] = s.value.trim();
    });
    const images = form.images.filter(u => u.trim());

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || toSlug(form.name),
      short_description: form.short_description.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price) || 0,
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      image_url: form.image_url.trim(),
      images,
      category: form.category,
      features,
      specifications,
      stock_quantity: parseInt(form.stock_quantity) || 0,
      is_best_seller: form.is_best_seller,
      is_featured: form.is_featured,
    };

    if (isEdit) {
      const { error: err } = await supabase.from('products').update(payload).eq('id', id);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: err } = await supabase.from('products').insert(payload);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    }

    navigate('/admin/products');
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <Link
        to="/admin/products"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        {isEdit ? 'Edit Product' : 'Add New Product'}
      </h1>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <Section title="Basic Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label>Product Name</Label>
              <input
                required
                value={form.name}
                onChange={e => updateField('name', e.target.value)}
                className={INPUT_CLASS}
                placeholder="e.g. Premium 8-Stage Shower Filter"
              />
            </div>
            <div>
              <Label>URL Slug</Label>
              <input
                required
                value={form.slug}
                onChange={e => {
                  setAutoSlug(false);
                  updateField('slug', e.target.value);
                }}
                className={INPUT_CLASS}
                placeholder="premium-8-stage-shower-filter"
              />
            </div>
            <div>
              <Label>Category</Label>
              <select
                value={form.category}
                onChange={e => updateField('category', e.target.value)}
                className={INPUT_CLASS}
              >
                <option value="">Select category</option>
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Section>

        <Section title="Pricing">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Price (GBP)</Label>
              <input
                required
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={e => updateField('price', e.target.value)}
                className={INPUT_CLASS}
                placeholder="29.95"
              />
            </div>
            <div>
              <Label>
                Original Price <span className="text-gray-400 font-normal">(optional, for showing discount)</span>
              </Label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.original_price}
                onChange={e => updateField('original_price', e.target.value)}
                className={INPUT_CLASS}
                placeholder="39.95"
              />
            </div>
          </div>
        </Section>

        <Section title="Description">
          <div className="space-y-4">
            <div>
              <Label>Short Description</Label>
              <input
                value={form.short_description}
                onChange={e => updateField('short_description', e.target.value)}
                className={INPUT_CLASS}
                placeholder="Brief tagline shown on product cards"
              />
            </div>
            <div>
              <Label>Full Description</Label>
              <textarea
                rows={5}
                value={form.description}
                onChange={e => updateField('description', e.target.value)}
                className={INPUT_CLASS + ' resize-y'}
                placeholder="Detailed product description..."
              />
            </div>
          </div>
        </Section>

        <Section title="Images">
          <div className="space-y-4">
            <div>
              <Label>Main Image URL</Label>
              <div className="flex gap-3 items-start">
                <div className="flex-1">
                  <input
                    value={form.image_url}
                    onChange={e => updateField('image_url', e.target.value)}
                    className={INPUT_CLASS}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {form.image_url && (
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                    <img
                      src={form.image_url}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={e => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label>Additional Images</Label>
                <button
                  type="button"
                  onClick={addImage}
                  className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
                >
                  <Plus className="h-3 w-3" />
                  Add Image
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {form.images.map((url, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      value={url}
                      onChange={e => updateImage(idx, e.target.value)}
                      className={INPUT_CLASS}
                      placeholder="https://example.com/image.jpg"
                    />
                    {url && (
                      <div className="h-8 w-8 shrink-0 overflow-hidden rounded border border-gray-200 bg-gray-50">
                        <img
                          src={url}
                          alt=""
                          className="h-full w-full object-cover"
                          onError={e => (e.currentTarget.style.display = 'none')}
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {form.images.length === 0 && (
                  <p className="flex items-center gap-2 text-xs text-gray-400">
                    <ImageIcon className="h-3.5 w-3.5" />
                    No additional images added
                  </p>
                )}
              </div>
            </div>
          </div>
        </Section>

        <Section title="Features">
          <div className="space-y-2">
            {form.features.map((feature, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  value={feature}
                  onChange={e => updateFeature(idx, e.target.value)}
                  className={INPUT_CLASS}
                  placeholder={`Feature ${idx + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeFeature(idx)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              <Plus className="h-3 w-3" />
              Add Feature
            </button>
          </div>
        </Section>

        <Section title="Specifications">
          <div className="space-y-2">
            {form.specifications.map((spec, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  value={spec.key}
                  onChange={e => updateSpec(idx, 'key', e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Key (e.g. Weight)"
                />
                <input
                  value={spec.value}
                  onChange={e => updateSpec(idx, 'value', e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Value (e.g. 250g)"
                />
                <button
                  type="button"
                  onClick={() => removeSpec(idx)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSpec}
              className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              <Plus className="h-3 w-3" />
              Add Specification
            </button>
          </div>
        </Section>

        <Section title="Inventory & Flags">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label>Stock Quantity</Label>
              <input
                type="number"
                min="0"
                value={form.stock_quantity}
                onChange={e => updateField('stock_quantity', e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
            <div className="flex items-end gap-6 sm:col-span-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_best_seller}
                  onChange={e => updateField('is_best_seller', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm font-medium text-gray-700">Best Seller</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={e => updateField('is_featured', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
            </div>
          </div>
        </Section>

        <div className="flex items-center gap-3 border-t border-gray-200 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
          <Link
            to="/admin/products"
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="mb-4 text-base font-semibold text-gray-900">{title}</h2>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-sm font-medium text-gray-700">{children}</label>;
}
