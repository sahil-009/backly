const { readFileSync } = require('fs');
const { join } = require('path');
const mongoose = require('mongoose');

let serverStartTime = Date.now();

const getVersion = () => {
  try {
    const packageJson = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf-8')
    );
    return packageJson.version || '1.0.0';
  } catch {
    return '1.0.0';
  }
};

const getUptime = () => {
  const uptime = Date.now() - serverStartTime;
  const seconds = Math.floor(uptime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
  if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};

// Check actual Mongoose connection state
const isDbConnected = () => {
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  return mongoose.connection.readyState === 1;
};

const welcomeHandler = (endpoints) => {
  return (req, res) => {
    const version = getVersion();
    const nodeVersion = process.version;
    const uptime = getUptime();
    const dbConnected = isDbConnected();
    const dbStatus = dbConnected ? '✓ Connected' : '✗ Not Connected';
    const dbClass = dbConnected ? 'online' : 'offline';

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Backly Dashboard</title>
  <style>
    body {
      background: #0d0d0d;
      color: #e6e6e6;
      font-family: "Courier New", monospace;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
    }

    .terminal {
      width: 100%;
      max-width: 800px;
      padding: 20px;
      border: 2px solid #333;
      border-radius: 8px;
      background: #1a1a1a;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    }

    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      flex-wrap: wrap;
      gap: 10px;
    }

    .title {
      font-size: 22px;
      color: #4da6ff;
    }

    .status {
      font-size: 16px;
      color: #aaa;
    }

    .status.online {
      color: #00e676;
    }

    .section {
      margin-bottom: 20px;
      line-height: 1.6;
      font-size: 16px;
    }

    .section div {
      margin-bottom: 8px;
    }

    .divider {
      height: 2px;
      background: #333;
      margin: 20px 0;
    }

    .subtitle {
      font-size: 18px;
      margin-bottom: 10px;
      color: #4da6ff;
    }

    .endpoints {
      background: #111;
      border: 1px solid #333;
      padding: 15px;
      border-radius: 4px;
      color: #cfcfcf;
      overflow-x: auto;
    }

    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      color: #777;
    }

    .online {
      color: #00e676;
    }

    .offline {
      color: #ff5252;
    }

    @media (max-width: 600px) {
      .terminal {
        padding: 15px;
      }
      .title {
        font-size: 18px;
      }
      .section {
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="terminal">
    <div class="header">
      <span class="title">⚡ BACKLY PRIME API</span>
      <span class="status online">● Server is running</span>
    </div>

    <div class="section">
      <div>Version: <span id="version">${version}</span></div>
      <div>Node.js: <span id="node">${nodeVersion}</span></div>
      <div>Environment: <span id="env">${process.env.NODE_ENV || 'development'}</span></div>
      <div>Uptime: <span id="uptime">${uptime}</span></div>
      <div>Database: <span id="db" class="${dbClass}">${dbStatus}</span></div>
      <div>Port: <span id="port">${process.env.PORT || 5000}</span></div>
    </div>

    <div class="divider"></div>

    <div class="section">
      <div class="subtitle">Available Endpoints</div>
      <pre class="endpoints">${endpoints.join('\n')}</pre>
    </div>

    <div class="footer">
      Built with ❤️ by Backly
    </div>
  </div>

  <script>
    // Update status every second
    setInterval(() => {
      fetch('/api/status')
        .then(res => res.json())
        .then(data => {
          document.getElementById('uptime').textContent = data.uptime;
          
          const dbElem = document.getElementById('db');
          if (data.dbConnected) {
            dbElem.textContent = '✓ Connected';
            dbElem.className = 'online';
          } else {
            dbElem.textContent = '✗ Not Connected';
            dbElem.className = 'offline';
          }
        })
        .catch(() => {});
    }, 1000);
  </script>
</body>
</html>
        `;

    res.send(html);
  };
};

// API endpoint for status (uptime + db) - checks actual connection state
const statusHandler = (req, res) => {
  res.json({
    uptime: getUptime(),
    dbConnected: isDbConnected()
  });
};

module.exports = { welcomeHandler, statusHandler };
