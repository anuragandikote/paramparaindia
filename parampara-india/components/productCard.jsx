import Image from "next/image";

export default function ProductCard({ product }) {
    return (
        <div className="w-full">
            {/* MOBILE VIEW (image only) */}
            <div className="block md:hidden rounded-xl overflow-hidden shadow-md">
                <div className="relative w-full aspect-square">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* DESKTOP VIEW (full flip card) */}
            <div className="hidden md:block perspective group w-full py-2 h-[450px]">
                <div
                    className="
            relative w-full h-full
            transition-transform duration-300
            preserve-3d
            group-hover:rotate-y-180
          "
                >
                    {/* FRONT */}
                    <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg flex flex-col">
                        <div className="relative w-full h-60">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover rounded-t-xl"
                            />
                        </div>

                        <div className="p-4 flex flex-col gap-2 flex-1">
                            <h3 className="text-xl font-bold">{product.name}</h3>
                            <p className="text-gray-700 flex-1">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* BACK (VIDEO) */}
                    {product.video && (
                        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden bg-black">
                            <video
                                src={product.video}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
