class Product{
    private String name;
    private double price;
    private int quantityStock;
    //setters
    public void setName(String name){
        this.name = name;
    }
    public void setPrice(double price){
        this.price = price;
    }
    public void setQuantityStock(int quantityStock){
        this.quantityStock = quantityStock;
    }
    //getters
    public String getName(){
        return name;
    }
    public double getPrice(){
        return price;
    }
    public int getQuantityStock(){
        return quantityStock;
    }
    //constructor
    public Product(String name, double price, int quantityStock){
        this.name = name;
        this.price = price;
        this.quantityStock = quantityStock;
    }
}