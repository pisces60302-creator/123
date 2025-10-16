import React, { useState } from 'react';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  const [form, setForm] = useState({
    participate: "",
    role: "幫眾",
    id: "",
    job: "鐵衣",
    comment: ""
  });

  const jobs = ["鐵衣","血河","龍吟","碎夢","神相","玄機","九靈","素問"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries([...entries, form]);
    setForm({participate:"",role:"幫眾",id:"",job:"鐵衣",comment:""});
  };

  const tryLogin = () => {
    if (password === "admin123") setIsAdmin(true);
    else alert("密碼錯誤");
  };

  const jobStats = jobs.map(job => ({
    job,
    count: entries.filter(e => e.job === job && e.participate === "是").length
  }));

  const participation = Math.round((entries.filter(e => e.participate === "是").length / 80) * 100);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">煙雨樓 幫戰排表系統</h1>

      {!isAdmin ? (
        <div className="mb-4 flex justify-center">
          <input
            type="password"
            placeholder="管理者密碼"
            className="border rounded-l px-3 py-1"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-3 py-1 rounded-r" onClick={tryLogin}>登入</button>
        </div>
      ) : (
        <p className="text-green-600 text-center">管理者模式已啟動</p>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label>是否參與：
            <select className="border ml-2" value={form.participate} onChange={e=>setForm({...form, participate:e.target.value})}>
              <option value="">請選擇</option>
              <option value="是">是</option>
              <option value="否">否</option>
            </select>
          </label>

          <label>幫會職位：
            <select className="border ml-2" value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
              <option>學徒</option>
              <option>幫眾</option>
            </select>
          </label>

          <label>遊戲ID：
            <input className="border ml-2" value={form.id} onChange={e=>setForm({...form, id:e.target.value})} />
          </label>

          <label>職業：
            <select className="border ml-2" value={form.job} onChange={e=>setForm({...form, job:e.target.value})}>
              {jobs.map(j => <option key={j}>{j}</option>)}
            </select>
          </label>

          <label className="md:col-span-2">想說的話：
            <input className="border w-full mt-1" value={form.comment} onChange={e=>setForm({...form, comment:e.target.value})} />
          </label>
        </div>
        <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">提交</button>
      </form>

      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="text-xl font-bold mb-2">統計資料</h2>
        <p>參與率：{participation}%</p>
        <ul className="list-disc pl-6">
          {jobStats.map(j => <li key={j.job}>{j.job}：{j.count}</li>)}
        </ul>
      </div>

      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-bold mb-2">報名名單</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2">參與</th>
              <th className="border px-2">職位</th>
              <th className="border px-2">ID</th>
              <th className="border px-2">職業</th>
              <th className="border px-2">留言</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={i}>
                <td className="border px-2 text-center">{e.participate}</td>
                <td className="border px-2 text-center">{e.role}</td>
                <td className="border px-2 text-center">{e.id}</td>
                <td className="border px-2 text-center">{e.job}</td>
                <td className="border px-2">{e.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
