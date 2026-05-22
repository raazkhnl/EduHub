import React from 'react';
import Layout from '@theme/Layout';
import BundleBuilder from '@site/src/components/BundleBuilder';

export default function BundlePage() {
  return (
    <Layout
      title="Bundle Builder — pick and download multiple chapters"
      description="Combine chapters across IOE, CTEVT, and TU into one Markdown, ZIP, or printable PDF."
    >
      <BundleBuilder />
    </Layout>
  );
}
