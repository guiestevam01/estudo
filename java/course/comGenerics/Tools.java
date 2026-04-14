package course.comGenerics;

public class Tools {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Tools(String name) {
        this.name = name;
    }
    public Tools setTools(String nameTools){
        return new Tools(nameTools);
    }
    @Override
    public String toString() {
        return "Tools{" +
                "name='" + name + '\'' +
                '}';
    }
}
