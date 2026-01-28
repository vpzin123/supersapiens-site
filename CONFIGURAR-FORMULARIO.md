# Configurar envio do questionário para seu email

Para que o questionário chegue no seu email (vpneuroscience@icloud.com), siga estes passos:

## Passo 1: Criar conta no Formspree (grátis)

1. Acesse: https://formspree.io
2. Clique em "Get Started" ou "Sign Up"
3. Crie uma conta com seu email (vpneuroscience@icloud.com)

## Passo 2: Criar um formulário

1. Após logar, clique em "+ New Form"
2. Dê um nome: "Questionário VP Nutrição"
3. Coloque seu email: vpneuroscience@icloud.com
4. Clique em "Create Form"

## Passo 3: Copiar o ID do formulário

1. Após criar, você verá uma URL assim:
   `https://formspree.io/f/xyzabcde`
2. Copie apenas o ID (a parte depois de /f/): `xyzabcde`

## Passo 4: Atualizar o código

1. Abra o arquivo: `src/components/questionnaire.tsx`
2. Procure por: `YOUR_FORM_ID`
3. Substitua por seu ID (ex: `xyzabcde`)

Exemplo:
```tsx
// ANTES:
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {

// DEPOIS:
const response = await fetch('https://formspree.io/f/xyzabcde', {
```

## Passo 5: Testar

1. Acesse seu site
2. Preencha o questionário
3. Envie
4. Verifique se chegou no seu email

---

## Plano gratuito do Formspree

- 50 envios por mês (suficiente para começar)
- Se precisar de mais, existem planos pagos

## Dúvidas?

O formulário já está todo configurado. Só precisa colocar o ID.
