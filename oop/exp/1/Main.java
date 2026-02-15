class Employee{
    private int socialSecurityNumber;
    private String gender;
    private String dateOfBirth;


    public void setGender(String gender){
        this.gender = gender;
    }
    public String getGender(){
        return gender;
    }
    public void setDateOfBirth(String dateOfBirth){
        
        if( DataAtual.day() <= 14 && DataAtual.month <= 02 && DataAtual.year <= 2026){
            this.dateOfBirth = dateOfBirth;
        } else{
            System.out.println("Data invalida.");
        }

    }
    public String getDateOfBirth(){
        return dateOfBirth;
    }
}
class DataAtual{
    private final LocalDate dataAtual = LocalDate.now();
   
    public static int day(){
        return dataAtual.getDayOfMouth();
    }
    public static int month(){
        return dataAtual.getMonthValue();
    }
    public static int year(){
        return hoy.getYear();
    }
}
class convertApi{
    public int[] convertString(String date){
        String[] partes = date.split("-");
        int 
    }
    public static dayConverted(String date){
        String[] partes = date.split("-");
        return day = Integer.parseInt(Partes[0]);
    }
}
public class Main{
    public static void main(String[] args){
        Employee myEmployee = new Employee();
        myEmployee.setDateOfBirth("13-03-2026");
        System.out.println(myEmployee.getDateOfBirth());

    }
}
