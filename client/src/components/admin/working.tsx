import React from 'react';
import { Droplets, Leaf, Shield, Award } from 'lucide-react';

export default function BisleriWebsite() {
    return (
        <div className="w-full bg-gradient-to-b from-blue-50 to-white">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4 px-6 shadow-lg">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Droplets size={32} />
                        <h1 className="text-3xl font-bold">Bisleri</h1>
                    </div>
                    <nav className="flex gap-6">
                        <a href="#" className="hover:text-blue-200">Home</a>
                        <a href="#" className="hover:text-blue-200">Products</a>
                        <a href="#" className="hover:text-blue-200">About</a>
                        <a href="#" className="hover:text-blue-200">Contact</a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-6 py-20 text-center">
                <h2 className="text-5xl font-bold text-blue-900 mb-4">Pure Water, Pure Life</h2>
                <p className="text-xl text-gray-600 mb-8">Experience freshness in every drop</p>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold">
                    Shop Now
                </button>
            </section>

            {/* Features */}
            <section className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h3 className="text-3xl font-bold text-center mb-12">Why Choose Bisleri?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <Shield className="mx-auto mb-4 text-blue-600" size={40} />
                            <h4 className="font-bold text-lg mb-2">100% Pure</h4>
                            <p className="text-gray-600">Purified using advanced technology</p>
                        </div>
                        <div className="text-center">
                            <Leaf className="mx-auto mb-4 text-green-600" size={40} />
                            <h4 className="font-bold text-lg mb-2">Eco-Friendly</h4>
                            <p className="text-gray-600">Recyclable bottles</p>
                        </div>
                        <div className="text-center">
                            <Award className="mx-auto mb-4 text-yellow-600" size={40} />
                            <h4 className="font-bold text-lg mb-2">Award-Winning</h4>
                            <p className="text-gray-600">Trusted by millions</p>
                        </div>
                        <div className="text-center">
                            <Droplets className="mx-auto mb-4 text-cyan-600" size={40} />
                            <h4 className="font-bold text-lg mb-2">Fresh Taste</h4>
                            <p className="text-gray-600">Minerals for better taste</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    {/* <p>© {new Date().toLocaleDateString('en-IN')} Bisleri. All rights reserved.</p> */}
                    <p>&copy; 2025 {new Date().getFullYear()} Bisleri. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}