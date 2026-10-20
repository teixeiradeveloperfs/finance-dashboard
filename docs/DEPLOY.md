# Deploy em VPS com Nginx, PM2 e deploy automático

Este guia publica o Finance em uma VPS Ubuntu usando:

- Nginx como proxy reverso e terminador HTTPS;
- PM2 para manter frontend e backend ativos;
- GitHub Actions para atualizar o servidor automaticamente a cada push na `main`.

## 1. Requisitos

VPS com Ubuntu 22.04+, domínio apontando para o IP do servidor e acesso SSH.

```bash
sudo apt update
sudo apt install -y git nginx curl build-essential
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm pm2
```

Crie o diretório do projeto e dê posse ao usuário de deploy:

```bash
sudo mkdir -p /var/www/finance-dashboard
sudo chown -R "$USER":"$USER" /var/www/finance-dashboard
git clone https://github.com/teixeiradeveloperfs/finance-dashboard.git /var/www/finance-dashboard
```

## 2. Variáveis de produção

Crie `backend/.env.production`:

```env
NODE_ENV=production
HOST=127.0.0.1
PORT=3333
FRONTEND_ORIGIN=https://finance.seudominio.com
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=coloque-a-chave-anon-aqui
COOKIE_SECRET=gere-uma-chave-aleatoria-com-mais-de-32-caracteres
AUTH_COOKIE_NAME=af_access_token
AUTH_REFRESH_COOKIE_NAME=af_refresh_token
PASSWORD_RESET_REDIRECT_URL=https://finance.seudominio.com/auth/recuperacao-senha
LOCAL_DEMO_AUTH=false
```

Crie `frontend/.env.production`:

```env
NUXT_PORT=3000
NUXT_PUBLIC_API_BASE_URL=https://finance.seudominio.com/api
```

Nunca versiona esses arquivos. Eles já estão cobertos pelo `.gitignore`.

## 3. Build e primeira inicialização

```bash
cd /var/www/finance-dashboard/backend
pnpm install --frozen-lockfile
pnpm build

cd /var/www/finance-dashboard/frontend
pnpm install --frozen-lockfile
pnpm build

cd /var/www/finance-dashboard
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

O último comando imprime outro comando `sudo`; execute-o para o PM2 voltar automaticamente após reinicializações.

## 4. Nginx

Crie `/etc/nginx/sites-available/finance-dashboard`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name finance.seudominio.com;

    location /api/ {
        proxy_pass http://127.0.0.1:3333/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Ative e valide:

```bash
sudo ln -s /etc/nginx/sites-available/finance-dashboard /etc/nginx/sites-enabled/finance-dashboard
sudo nginx -t
sudo systemctl reload nginx
```

Depois, habilite HTTPS com Certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d finance.seudominio.com
```

## 5. Deploy automático com GitHub Actions

No GitHub, configure estes secrets no repositório em **Settings → Secrets and variables → Actions**:

- `DEPLOY_HOST`: IP ou hostname da VPS;
- `DEPLOY_USER`: usuário SSH;
- `DEPLOY_PATH`: `/var/www/finance-dashboard`;
- `DEPLOY_SSH_KEY`: chave privada SSH usada pelo GitHub Actions.

Adicione a chave pública correspondente em `~/.ssh/authorized_keys` do servidor. O workflow em `.github/workflows/deploy.yml` executa:

1. `git fetch` e `git reset --hard origin/main` no servidor;
2. instalação com lockfile;
3. build do backend e frontend;
4. `pm2 reload ecosystem.config.cjs --update-env`;
5. verificação do endpoint `/health`.

Faça o primeiro deploy manualmente para criar os `.env.production`; o workflow não sobrescreve esses arquivos.

## 6. Operação e diagnóstico

```bash
pm2 status
pm2 logs finance-frontend
pm2 logs finance-backend
pm2 restart ecosystem.config.cjs --update-env
curl -i http://127.0.0.1:3333/health
sudo nginx -t
```

Se o frontend abrir, mas login falhar, confirme `FRONTEND_ORIGIN`, `NUXT_PUBLIC_API_BASE_URL`, cookies HTTPS e as credenciais do Supabase.
