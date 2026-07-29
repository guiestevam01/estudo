//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
void main() {
    Scanner scanner = new Scanner(System.in);
    System.out.println("How many employees will be registered? ");
    int n = scanner.nextInt();
    Funcionario[] funcionarios = new Funcionario[n];
    for (int i = 0; i < funcionarios.length; i++) {
        System.out.println();
        System.out.println("Employee #" + i + ":");
        System.out.print("id: ");
        int id = scanner.nextInt();
        System.out.print("Name: ");
        scanner.nextLine();
        String name = scanner.nextLine();
        System.out.print("Salary: ");
        double salary = scanner.nextDouble();
        funcionarios[i] = new Funcionario(name, salary, id);
    }
    System.out.println("Enter the employee id that will have salary increase : ");
    int searchId = scanner.nextInt();
    System.out.println("Enter the percentage: ");
    double aumento = scanner.nextInt();
    if(!Funcionario.aumentarSalario(funcionarios, searchId, aumento)){
        System.out.println("id não existe");
    } else{
        System.out.println("List of employess: ");
        for(Funcionario funcionario : funcionarios){
            System.out.println(funcionario.getId() + ", " + funcionario.getNome() + ", " + funcionario.getSalario());
        }
    }
}