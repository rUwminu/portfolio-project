import TwitterIcon from "@/assets/icons/socials/Twitter.svg";
import TreadsIcon from "@/assets/icons/socials/Threads.svg";
import FacebookIcon from "@/assets/icons/socials/Facebook.svg";
import InstragramIcon from "@/assets/icons/socials/Instagram.svg";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-2 py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <h2 className="text-white text-xl font-bold">9 Kitchen</h2>
            <p className="text-zinc-400 text-sm max-w-xs">
              We have a proper passion for cooking. Love is the secret
              ingredient.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-semibold mb-1">Contact Us</h3>
            <p className="text-zinc-400 text-sm">+60 12-345 6789</p>
            <p className="text-zinc-400 text-sm">hello@9kitchen.com</p>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold">Follow Us</h3>
            <div className="flex gap-3">
              {[TwitterIcon, TreadsIcon, FacebookIcon, InstragramIcon].map(
                (Icon, idx) => (
                  <button
                    key={idx}
                    className="w-10 h-10 p-2 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs hover:bg-orange-600 transition-colors duration-200"
                  >
                    <Icon className="text-white" />
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-6 border-t border-zinc-800 text-center text-zinc-500 text-xs">
          © {new Date().getFullYear()} 9 Kitchen. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
