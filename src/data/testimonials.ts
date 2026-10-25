export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

// TODO(content): add real, client-approved testimonials. The home page section stays hidden while this is empty.
export const testimonials: Testimonial[] = [];
