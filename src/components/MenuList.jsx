import { useEffect, useState } from "react";
import axios from "axios";

function MenuList() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/menu")
      .then(res => setMenu(res.data))
      .catch(err => console.error("Error fetching menu:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">🍕 FlyingSaucer Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {menu.map(item => (
          <div key={item.id} className="border rounded-xl p-4 shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuList;
