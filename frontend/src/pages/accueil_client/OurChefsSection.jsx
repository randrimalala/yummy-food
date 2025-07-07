import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const teamMembers = [
  { name: "David Latham", role: "Kitchen Manager", img: "/team_1_3.jpg" },
  { name: "Mary Jenica", role: "Meat Manager", img: "/team_1_2.jpg" },
  { name: "Joseph Carter", role: "Waitress Administrator", img: "/team_1_1.jpg" },
  { name: "Anjelina Rosee", role: "Blondee Chief", img: "/team_1_4.jpg" },
];

const TeamSection = () => (
  <div className="w-full bg-gradient-to-b from-gray-50 to-gray-50 py-16 px-4">
    <div className="text-left mb-10 px-6">
  {/* Ligne avec tiret à gauche et sous-titre */}
  <div className="flex items-center gap-2 mb-2">
    <span className="text-sm uppercase tracking-wide text-[#d35400]">
      — Yummy food Team
    </span>
  </div>

  {/* Titre principal avec soulignement en dessous de 'récents' */}
  <h2 className="text-3xl font-extrabold text-gray-800 leading-tight">
    Nos Dynamiques{" "}
    <span className="relative text-[#d35400] inline-block">
      Fast Food Chef
      {/* Soulignement comme dans l’image */}
      <svg
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="absolute bottom-[-5px] left-0 w-full h-[6px]" 
      >
        <path
          d="M10,5 Q25,10 50,5 Q75,0 90,5" 
          fill="none"
          stroke="#d35400"
          strokeWidth="5"  
        />
      </svg>
    </span>
  </h2>
</div>
  {/* ← fond modifié ici */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
      {teamMembers.map((member, index) => (
        <div key={index} className="relative flex flex-col items-center group">
          <div className="w-32 h-32 rounded-full border-4 border-[#d35400] overflow-hidden z-10">
            <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
          </div>

          <div className="relative -mt-14 w-full bg-white rounded-xl shadow-md py-4 pt-20 px-4 min-h-[260px] overflow-hidden group-hover:text-white transition duration-500">
            <div className="absolute inset-0 bg-[#d35400] translate-y-full group-hover:translate-y-0 transition duration-500 rounded-xl z-0" />
            <div className="relative z-10 text-center">
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-sm mb-3">{member.role}</p>
              <div className="flex justify-center gap-4 text-lg">
                {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, i) => (
                  <Icon key={i} className="cursor-pointer group-hover:text-white hover:scale-110 transition" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);


export default TeamSection;
