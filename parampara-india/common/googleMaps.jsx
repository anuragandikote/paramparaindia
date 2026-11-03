import { ADDRESS } from "@/data/site";

export default function GoogleMap() {
  return (
    <>
    <div className="text-center text-2xl md:text-4xl font-semibold mb-3">Our Location</div>
    <p className="text-center text-gray-700 mb-5 px-4">{ADDRESS.line}</p>
    <div style={{ width: "100%", height: "400px" }}>
      <iframe
        title="Parampara India Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.543456610583!2d77.5269866!3d12.861564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae412f0f241e09%3A0xdb3bd8c41de5358f!2sParampara%20India%20-%20Wood%20Gasifier%20Stoves!5e0!3m2!1sen!2sin!4v1737280000000"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        />
    </div>
        </>
  );
}