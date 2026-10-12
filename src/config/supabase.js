// Importa a função createClient da biblioteca do Supabase.
// Essa função é responsável por criar a conexão entre o app e o banco de dados.
import { createClient } from '@supabase/supabase-js';


// Define a URL do projeto no Supabase.
// Essa URL identifica qual projeto será acessado.
// É encontrada no painel do Supabase em "Project Settings".
const supabaseUrl = 'https://kbewqervkdjxpuywrepo.supabase.co';


// Define a chave pública (anon key) do Supabase.
// Essa chave permite que o frontend se conecte ao banco.
// Mesmo sendo pública, o acesso aos dados é controlado pelas policies (RLS).
const supabaseKey = 'sb_publishable_XGxoFxTGoTZSYz12eeJ-tA_AkJaNi3A';


// Cria uma instância do cliente Supabase.
export const supabase = createClient(supabaseUrl, supabaseKey);