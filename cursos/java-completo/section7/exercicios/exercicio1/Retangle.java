package exercicios.exercicio1;

public class Retangle {
    private double width; // largura(base)
    private double height;
    public Retangle(double width, double height){
        this.width = width;
        this.height = height;
    }

    public double area(){
        return width * height;
    }
    public double perimeter(){
        return 2*(width + height);
    }
    public double diagonal(){
        return Math.sqrt((width*width) + (height*height));
    }

    public String toString(){
        return "AREA = " + String.format("%.2f\n", area()) + "PERIMETER = "+ String.format(("%.2f\n"), perimeter()) + "DIAGONAL = " + String.format(("%.2f"), diagonal());
    }

}
