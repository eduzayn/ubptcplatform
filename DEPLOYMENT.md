# Guia de Deployment para o Vercel

## Pré-requisitos

- Conta no Vercel
- Git instalado localmente
- Repositório Git configurado para o projeto
- Variáveis de ambiente configuradas no Vercel (já feito)

## Fluxo de Trabalho para Deploy

### 1. Desenvolva localmente no Tempo

Faça suas alterações e teste-as no ambiente Tempo.

### 2. Faça commit das alterações

```bash
git add .
git commit -m "Sua mensagem de commit"
```

### 3. Envie para o repositório

```bash
git push origin main
```

### 4. Verificação do Deploy

O Vercel detectará automaticamente as alterações e iniciará o processo de build e deploy.
Você pode acompanhar o progresso no dashboard do Vercel.

## Verificações Importantes

- **vercel.json**: Seu arquivo já está configurado corretamente com as seguintes configurações:
  - Rewrites para SPA
  - Build command: `npm run build`
  - Output directory: `dist`
  - Framework: `vite`

- **Variáveis de ambiente**: Já configuradas no Vercel. Certifique-se de que incluem:
  - `SUPABASE_PROJECT_ID`
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_KEY`
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

- **.gitignore**: Já configurado para excluir arquivos desnecessários como:
  - `node_modules`
  - `dist`
  - `.env`
  - `tempobook/dynamic/`
  - `tempobook/storyboards/`

## Testando Localmente Antes de Enviar

### Build de Produção

```bash
npm run build
```

Este comando compilará o projeto para produção na pasta `dist`.

### Visualização Local

```bash
npm run preview
```

Este comando iniciará um servidor local para visualizar a versão de produção.

## Solução de Problemas

### Se o build falhar no Vercel

1. Verifique os logs de build no dashboard do Vercel
2. Confirme que todas as variáveis de ambiente estão configuradas corretamente
3. Teste o build localmente para identificar problemas

### Se as variáveis de ambiente não estiverem funcionando

1. Verifique se os nomes das variáveis no Vercel correspondem exatamente aos usados no código
2. Certifique-se de que as variáveis VITE_ estão disponíveis no cliente

## Comandos Git Úteis

### Verificar status

```bash
git status
```

### Ver histórico de commits

```bash
git log --oneline
```

### Criar uma nova branch

```bash
git checkout -b nome-da-feature
```

### Mudar para a branch principal

```bash
git checkout main
```
