import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Cuboid as Cube, View, ShoppingCart, Heart, Share2 } from 'lucide-react';

const IkeaProductPage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200 px-4 py-3">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-900">MÖBEL</h1>
                    <div className="flex gap-4">
                        <Heart className="w-6 h-6 text-gray-600" />
                        <ShoppingCart className="w-6 h-6 text-gray-600" />
                    </div>
                </div>
            </nav>

            {/* Product Section */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <img
                            src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80"
                            alt="SÖDERHAMN Fauteuil"
                            className="w-full h-[500px] object-cover rounded-lg"
                        />
                        <div className="grid grid-cols-4 gap-2">
                            {[...Array(4)].map((_, i) => (
                                <img
                                    key={i}
                                    src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300&q=80"
                                    alt={`Vue ${i + 1}`}
                                    className="w-full h-24 object-cover rounded-md cursor-pointer hover:opacity-75 transition"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-900">SÖDERHAMN</h1>
                            <p className="text-xl text-gray-600">Fauteuil confort</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-3xl font-bold">599,00 €</p>
                            <p className="text-green-600 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                En stock
                            </p>
                        </div>

                        <p className="text-gray-600">
                            Un fauteuil moderne au design scandinave, offrant un confort optimal grâce à son assise profonde et ses accoudoirs généreux. Parfait pour créer un espace de détente dans votre salon.
                        </p>

                        <div className="space-y-4">
                            <button className="w-full bg-blue-600 text-white py-4 rounded-full font-semibold hover:bg-blue-700 transition">
                                Ajouter au panier
                            </button>

                            <button
                                onClick={() => navigate('/personnalisation')}
                                className="w-full bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-full font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
                            >
                                <Cube className="w-5 h-5" />
                                Personnaliser en 3D
                                <ChevronRight className="w-5 h-5" />
                            </button>

                            {isMobile && (
                                <button className="w-full bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-full font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2">
                                    <View className="w-5 h-5" />
                                    Voir en AR
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        <div className="border-t border-gray-200 pt-6 space-y-4">
                            <h3 className="font-semibold text-lg">Caractéristiques principales</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>Dimensions: L80 × P105 × H85 cm</li>
                                <li>Revêtement: 100% polyester</li>
                                <li>Structure: Bois massif, Contreplaqué</li>
                                <li>Garantie: 10 ans</li>
                            </ul>
                        </div>

                        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
                            <Share2 className="w-5 h-5" />
                            Partager
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IkeaProductPage;
