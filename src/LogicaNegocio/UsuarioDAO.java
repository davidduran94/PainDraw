package LogicaNegocio;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.regex.Pattern;

import LogicaNegocio.MailSender;

public class UsuarioDAO {
	
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
		
		
		
		public boolean existeUsuario(String nombre){
			boolean existe = false;
			conectar();
			runSQL("SELECT * FROM usuarios WHERE nombre='" + nombre + "';");
			ArrayList<ArrayList<String>> matriz;
			matriz = getMatrix();
			if(!(matriz.size()==1))
			{
				existe = true;
			}
			desconectar();
			return existe;
		}
		
		public boolean coincidePass(String pass, String nombre){
			boolean coincide = false;
			conectar();
			runSQL("select * from usuarios where nombre='" + nombre + "' and pass='" + pass + "';");
			ArrayList<ArrayList<String>> matriz;
			matriz = getMatrix();
			if(!(matriz.size()==1))
			{
				coincide = true;
			}
			desconectar();
			return coincide;
		}
		
		public String registrar(String nombre, String correo, String pass, String confirmarPass){
			Pattern patronUsuarioPass = Pattern.compile(" ");
			Pattern patronEMail = Pattern.compile("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"); 
			if(nombre.replace(" ", "").equals("") || correo.replace(" ", "").equals("") || pass.replace(" ", "").equals("") || confirmarPass.replace(" ", "").equals("")){
				return "Todos los campos son obligatorios";
			}
			else if(patronUsuarioPass.matcher(nombre).find()){
				return "El nombre de usuario no puede contener espacios";
			}
			else if(existeUsuario(nombre)){
				return "Alguien mas ya esta usando ese nombre de usuario";
			}
			else if(!patronEMail.matcher(correo).matches()){
				return "Correo Electronico no válido";
			}
			else if(patronUsuarioPass.matcher(pass).find() || pass.length() < 4){
				return "La contraseña no debe contener espacios ni ser menor a 4 caracteres";
			}
			else if(!pass.equals(confirmarPass)){
				return "La contraseña no coincide con su confirmación";
			}
			else{
			conectar();
			runSQL("INSERT INTO usuarios (nombre,correo,pass) VALUES('" + nombre + "','" + correo + "','" + pass + "');");
			desconectar();
			MailSender mail = new MailSender();
			String pagina = "<html>";
			pagina += "\n\t<body>";
			pagina += "\n\t\t<h2>Bienvenido " + nombre + "!</h2>";
			pagina += "\n\t\t<h4>Ahora formas parte de la comunidad de Paint & Draw</h4>";
			pagina += "\n\t\t<h4>Los datos de tu cuenta son:</h4>";
			pagina += "\n\t\t<br/>";
			pagina += "\n\t\t<table style=\"border: 20px solid Green;\">";
			pagina += "\n\t\t\t<tr><td>Nombre de usuario: " + nombre + "</td></tr>";
			pagina += "\n\t\t\t<tr><td>Contraseña: " + pass + "</td></tr>";
			pagina += "\n\t\t</table>";
			pagina += "\n\t\t<br/>";
			pagina += "\n\t\t<h4>El equipo de Draw & Paint</h4>";
			pagina += "\n\t</body>";
			pagina += "\n</html>";
			mail.enviarMailHTML("Datos del registro", pagina, correo);
			return "Felicitaciones el registro fue exitoso y se te ha enviado un correo";
			}
		}
		

		public String login(String nombreOcorreo, String pass){
			conectar();
			runSQL("select * from usuarios where nombre='" + nombreOcorreo + "' and pass='" + pass + "';");
			ArrayList<ArrayList<String>> matriz;
			matriz = getMatrix();
			if(!(matriz.size()==1))
			{
				desconectar();
				return "Login realizado";
			}
			else{
				runSQL("select * from usuarios where correo='" + nombreOcorreo + "' and pass='" + pass + "';");
				matriz = getMatrix();
				if(!(matriz.size()==1))
				{
					desconectar();
					return "Login realizado";
				}
				else
				{
					desconectar();
					return "El nombre de usuario o contraseña son incorrectos";
				}
			}
		}
		
		public String recuperar(String nombreOcorreo){
			conectar();
			runSQL("select * from usuarios where nombre='" + nombreOcorreo + "';");
			ArrayList<ArrayList<String>> matriz;
			matriz = getMatrix();
			if(!(matriz.size()==1))
			{
				matriz = getMatrix();
				String pass = matriz.get(1).get(3);
				String correo = matriz.get(1).get(2);
				desconectar();
				MailSender mail = new MailSender();
				String pagina = "<html>";
				pagina += "\n\t<body>";
				pagina += "\n\t\t<h2>Hola de nuevo " + nombreOcorreo + "</h2>";
				pagina += "\n\t\t<h4>Tu contraseña es:</h4>";
				pagina += "\n\t\t<br/>";
				pagina += "\n\t\t<table style=\"border: 20px solid Green;\">";
				pagina += "\n\t\t\t<tr><td>Contraseña: " + pass + "</td></tr>";
				pagina += "\n\t\t</table>";
				pagina += "\n\t\t<br/>";
				pagina += "\n\t\t<h4>El equipo de Draw & Paint</h4>";
				pagina += "\n\t</body>";
				pagina += "\n</html>";
				mail.enviarMailHTML("Datos del registro", pagina, correo);
				return "Te hemos enviado un correo con la contraseña";
			}
			else
			{
				desconectar();
				return "Este usuario no existe!";
			}
		}
		
		public String configurar(String nombreUsuario, String nombreNuevoUsuario, String correoNuevo, String passAntiguo, String passNuevo, String confirmarPassNuevo){
			Pattern patronUsuarioPass = Pattern.compile(" ");
			Pattern patronEMail = Pattern.compile("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"); 
			if(patronUsuarioPass.matcher(nombreNuevoUsuario).find()){
				return "El nombre de usuario no puede contener espacios";
			}
			else if(existeUsuario(nombreNuevoUsuario)){
				return "Alguien mas ya está usando ese nombre de usuario";
			}
			else if(!patronEMail.matcher(correoNuevo).matches()){
				return "Correo Electronico no valido";
			}
			else if(!coincidePass(passAntiguo,nombreUsuario)){
				return "La contraseña antigua es incorrecta";
			}
			else if(patronUsuarioPass.matcher(passNuevo).find() || passNuevo.length() < 4){
				return "La contraseña nueva no debe contener espacios ni ser menor a 4 caracteres";
			}
			else if(!passNuevo.equals(confirmarPassNuevo)){
				return "La contraseña nueva no coincide con su confirmaci��n";
			}
			else{
			conectar();
			runSQL("UPDATE usuarios SET nombre='" + nombreNuevoUsuario + "',correo='" + correoNuevo + "',pass='" + passNuevo + "' WHERE nombre='" + nombreUsuario + "';");
			desconectar();
			return "Tu configuración se ha modificado correctamente!";
			}
		}
	}
