// File: pages/index.js
import React from 'react';
import PromotionForm from '../components/PromotionForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <PromotionForm />
    </div>
  );
}
