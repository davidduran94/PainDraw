package LogicaNegocio;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class DibujosDAO {
	
		private Connection connection; //objeto Connection permitir? la conexi?n a la DB
		private Statement statement;
		private ArrayList<ArrayList<String>> matriz;
		
		
		/**
		 * el metodo se va a conectar a la base da datos login
		 */
		public void conectar()
		{
			try {
				Class.forName("com.mysql.jdbc.Driver");
				System.out.println("Driver Cargado");
				//Cambia tus datos de la base de datos
				connection=DriverManager.getConnection("jdbc:mysql://localhost:3306/dibujemos", "root", "");
				statement = connection.createStatement();
				if (connection != null){
					System.out.println("Conexion Establecida");
				}
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		/**
		 * El meto va a desconectarse d ela base de datos
		 */
		public void desconectar()
		{
			try {
				statement.close(); //Se cierra el flujo de ejecuci?n de sentencias SQL
				connection.close(); //Se cierra la conexi?n de la base de datos.
				System.out.println("Disconnect successfull");
			} catch (SQLException e) {
				System.out.println("Error al desconectarse de la base de datos; " + e.toString());
			}
		
		}
		
		////Modificacion
		public boolean runSQL(String sql)
		{
			matriz = new ArrayList<ArrayList<String>>();
			boolean respuesta,res2;
			ResultSet res;
			respuesta = false;
			try {
				respuesta=statement.execute(sql);
				//while(re.next()){
					//System.out.println("1.-"+re.getString(1)+"--"+re.getString(2));
				System.out.println("Resultado:"+respuesta);
				if(respuesta==true){
					res=statement.getResultSet();
					int columnas=res.getMetaData().getColumnCount();
					System.out.println("Columnas:"+columnas);
					int count = 0;
					matriz.add(new ArrayList<String>());
					while(count<columnas){
						String nombr = res.getMetaData().getColumnName(count+1);
						matriz.get(0).add(nombr);
						System.out.print(nombr + "  ");
						count++;
					}
					System.out.println("");
					int filas=0;
					while(res.next()){
						filas++;
						matriz.add(new ArrayList<String>());
						for(int i=1;i<=columnas;i++){
							matriz.get(filas).add(res.getObject(i).toString());
							System.out.print(res.getObject(i)+"  ");
						}
						System.out.println("");
					}
				}
				else
				{
					res2=statement.getMoreResults();
					System.out.println("Respuesta de getMoreResult()"+res2);
				}
				//}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return respuesta;
		}
		
		public ArrayList<ArrayList<String>> getMatrix(){
			return matriz;
		}
		
		public int getIdUsuario(String nombreUsuario){
			int id=0;
			conectar();
			runSQL("SELECT * FROM usuarios WHERE nombre='" + nombreUsuario + "';");
			ArrayList<ArrayList<String>> matriz;
			matriz = getMatrix();
			if(!(matriz.size()==1))
			{
				matriz = getMatrix();
				id = Integer.valueOf(matriz.get(1).get(0));
			}
			desconectar();
			return id;
		}
		
		public boolean existeDibujo(String nombreDibujo, String nombreUsuario){
			boolean existe = false;
			conectar();
			if(runSQL("SELECT * FROM dibujos WHERE nombre='" + nombreDibujo + "' and idusuario=" + getIdUsuario(nombreUsuario) + ";"))
			{
				existe = true;
			}
			desconectar();
			return existe;
		}
		
		public String guardar(String base64, String nombreDibujo, String nombreUsuario){ 
			if(existeDibujo(nombreDibujo, nombreUsuario)){
				return "Ese dibujo ya existe, ¿desea sobreescribirlo?";
			}
			else{
			conectar();
			runSQL("INSERT INTO dibujos (nombre,dibujo,idusuario) VALUES('" + nombreDibujo + "','" + base64 + "'," + getIdUsuario(nombreUsuario) + ");");
			desconectar();
			return "Dibujo guardado!";
			}
		}
		
		public String cargar(String nombreDibujo, String nombreUsuario){
			conectar();
			if(existeDibujo(nombreDibujo, nombreUsuario))
			{
				ArrayList<ArrayList<String>> matriz;
				matriz = getMatrix();
				String base64 = matriz.get(1).get(2);
				desconectar();
				return base64;
			}
			else
			{
				desconectar();
				return "Este dibujo no existe!";
			}
		}
		
		public String sobreescribir(String base64, String nombreDibujo, String nombreUsuario){ 
			conectar();
			if(existeDibujo(nombreDibujo, nombreUsuario)){
				runSQL("UPDATE dibujos SET dibujo='" + base64 + "' WHERE nombre='" + nombreDibujo + "';");
				desconectar();
				return "Dibujo guardado!";
			}
			else{
			runSQL("INSERT INTO dibujos (nombre,dibujo,idusuario) VALUES('" + nombreDibujo + "','" + base64 + "'," + getIdUsuario(nombreUsuario) + ");");
			desconectar();
			return "Dibujo guardado!";
			}
		}
	}
