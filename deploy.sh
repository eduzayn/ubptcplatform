#!/bin/bash

# Script para facilitar o processo de deploy

echo "🚀 Iniciando processo de deploy para Vercel"

# Verificar se há mudanças não commitadas
if [[ $(git status --porcelain) ]]; then
  echo "📝 Detectadas alterações não commitadas"
  
  # Perguntar pela mensagem de commit
  echo "✏️  Digite sua mensagem de commit:"
  read commit_message
  
  # Adicionar todas as alterações
  echo "➕ Adicionando alterações..."
  git add .
  
  # Commit das alterações
  echo "💾 Fazendo commit: $commit_message"
  git commit -m "$commit_message"
else
  echo "✅ Não há alterações pendentes para commit"
 fi

# Verificar se há commits para push
local_commit=$(git rev-parse HEAD)
remote_commit=$(git rev-parse @{u} 2>/dev/null || echo "no-remote")

if [ "$local_commit" != "$remote_commit" ] || [ "$remote_commit" = "no-remote" ]; then
  echo "⬆️  Enviando alterações para o repositório remoto..."
  git push origin main
  
  if [ $? -eq 0 ]; then
    echo "✅ Push realizado com sucesso!"
    echo "🔄 O Vercel detectará as alterações e iniciará o deploy automaticamente"
    echo "🌐 Verifique o status do deploy no dashboard do Vercel"
  else
    echo "❌ Erro ao fazer push. Verifique suas credenciais e conexão"
    exit 1
  fi
else
  echo "✅ Não há commits para enviar ao repositório remoto"
fi

# Perguntar se deseja testar o build localmente
echo "🧪 Deseja testar o build localmente antes? (s/n)"
read test_build

if [ "$test_build" = "s" ] || [ "$test_build" = "S" ]; then
  echo "🔨 Executando build de produção..."
  npm run build
  
  if [ $? -eq 0 ]; then
    echo "✅ Build concluído com sucesso!"
    echo "🔍 Iniciando preview local..."
    npm run preview
  else
    echo "❌ Erro durante o build. Corrija os problemas antes de fazer deploy"
    exit 1
  fi
fi

echo "🎉 Processo de deploy concluído!"
