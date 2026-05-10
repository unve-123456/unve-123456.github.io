const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// 发布公告
app.post('/api/announce', (req, res) => {
  try {
    const { title, content } = req.body;
    const data = { title, content, time: new Date().toLocaleString() };
    
    // 保存到公告文件
    fs.writeFileSync(path.join(__dirname, 'announce.json'), JSON.stringify(data, null, 2));
    res.json({ success: true, msg: '发布成功' });
  } catch (e) {
    res.json({ success: false });
  }
});

// 获取公告
app.get('/api/get-announce', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'announce.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (e) {
    res.json({});
  }
});

const PORT = process.env.PORT || 6666;
app.listen(PORT, () => console.log('服务启动'));
