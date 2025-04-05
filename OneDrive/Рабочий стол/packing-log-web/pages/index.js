import { useState } from "react";

export default function PackingLogWeb() {
  const [employeeName, setEmployeeName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    if (!employeeName || !quantity) {
      alert("Пожалуйста, заполните все поля");
      setLoading(false);
      return;
    }

    const data = {
      employeeName,
      quantity: Number(quantity),
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxjw4Ty-2uHmmW_dvxFbxBhEyWyT5TknHi8-qk9l66e2gOmvgzaNyqGJ5eBvk4xW7Q/exec",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setSuccess(true);
        setEmployeeName("");
        setQuantity("");
      } else {
        alert("Ошибка при отправке данных");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка при отправке запроса");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb", padding: 20 }}>
      <div style={{ background: "white", padding: 30, borderRadius: 16, boxShadow: "0 0 10px rgba(0,0,0,0.1)", width: "100%", maxWidth: 400 }}>
        <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>📦 Учёт переупаковки</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", marginBottom: 4 }}>Имя сотрудника</label>
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Введите имя"
              style={{ padding: 10, width: "100%", borderRadius: 6, border: "1px solid #ccc" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: 4 }}>Количество единиц</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Например: 25"
              style={{ padding: 10, width: "100%", borderRadius: 6, border: "1px solid #ccc" }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: 12,
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            {loading ? "Отправка..." : "Сохранить"}
          </button>
          {success && (
            <div style={{ color: "green", fontSize: 14 }}>Запись успешно отправлена ✅</div>
          )}
        </form>
      </div>
    </div>
  );
}