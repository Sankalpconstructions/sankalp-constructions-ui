import { constructMetadata } from "@/lib/seo";
import ContactClient from "./ContactClient";

export const metadata = constructMetadata({
  title: "Contact Sankalp Constructions | Premium Real Estate Support",
  description: "Get in touch with the dedicated team at Sankalp Constructions and embark on your journey toward finding the perfect premium property that matches your exact lifestyle needs. Whether you are looking to invest in a technologically advanced smart home, a serene countryside villa, or a highly profitable commercial real estate space, our experienced and tailored advisors are ready to assist you. Our corporate office in Pune provides a transparent, secure, and fully guided experience through every step of the exploration and purchasing process. Contact our sales department today via phone or email for detailed project brochures, site visit scheduling, loan advisory connections, or to get immediate answers to your specific and broad queries about any of our diverse, vibrant, and continuously expanding real estate developments.",
});

export default function ContactPage() {
  return <ContactClient />;
}
