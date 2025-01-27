import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eyaraedkwjgspknimmfb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5YXJhZWRrd2pnc3BrbmltbWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI4MTgsImV4cCI6MjA1MjMzODgxOH0.6GEOM6YASqLMdFYTmNW7ceebdOKKxtVMQjUqlm8VWWg"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(){
    const{data:articulos,error} = await supabase
    .from('articulo')
    .select('id,titulo,autor,fecha_publicacion')

    return new Response(JSON.stringify(articulos), {status: 200})
}

export async function DELETE(request){
    const body = await request.json()
    const id = body.id
    const{data: deleteData, error} = await supabase
    .from("articulo")
    .delete()
    .eq("id",id)

    if (error) {
        return new Response(JSON.stringify(error), { status: 404 });
      }
    return new Response(JSON.stringify({success: "eliminado con éxito"}), {status:200})
}

export async function POST(request){
    const body = await request.json()
    const articulo = body.articulo;

    if (titulo !== "" && contenido !== "" && autor !== "" && titulo.length < 150) {

        const{data: postData, error} = await supabase
        .from("articulo")
        .insert(articulo)
        
        if (!error) {
            return new Response(JSON.stringify({ success: "Creado con éxito" }), {
              status: 201,
            });
          }
    
    }else{
        return new Response(
            JSON.stringify({
              error: "Algun campo vacío o titulo supera 150",
            }),
            { status: 400 }
          );
    }

   
    return new Response(JSON.stringify({success: "Creado con éxito"}), {status:201})
}

