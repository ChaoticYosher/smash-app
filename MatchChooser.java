import java.util.Scanner;
import java.util.ArrayList;
import java.util.Random;
import java.util.PriorityQueue;
class Player implements Comparable<Player>{
	String name, fighter;
	Integer points;
	public Player(String name, String fighter){
		this.name = name;
		this.fighter = fighter;
		points = new Integer(0);
	}
	public static Player readPlayer(Scanner in){
		String name, fighter;
		Player t;
		try{
			name = in.nextLine();
			fighter = in.nextLine();
			t = new Player(name,fighter);
			return t;
		} catch (Exception e){
			System.out.println("Try again");
			return new Player("","");
		}
	}
	
	public String name(){
		return name;
	}
	
	public String fighter(){
		return fighter;
	}
	
	public Integer points(){
		return points;
	}
	
	public void setPoints(Integer points){
		this.points = points;
	}
	
	public String toString(){
		return "'" + name + "' : '" + fighter + "'";
	}
	
	public int compareTo(Player p){
		return points.compareTo( p.points() );
	}
}
public class MatchChooser {	
	private static Random gen = new Random();
	public static void main (String args[]) {
		Scanner in = new Scanner(System.in);
		ArrayList<Player> players = new ArrayList<Player>(), t;
		PriorityQueue<Player> top;
		final String quit = "Q", add = "A", shuffle = "S", robin = "R", list = "L", finals = "F";
		final String prompt = "Add players (" + add + ") : Shuffle (" + shuffle + ") : List Players (" + list + ") : Select Finalists (" + finals + ") : " + quit + " to quit."; 
		String action = action( in, prompt );
		int n, score;
		while ( !action.equalsIgnoreCase( quit ) ){
			if( action.equalsIgnoreCase( add ) ){
				t = getPlayers(in);
				for ( Player p : t ){
					players.add( p );					
				}
			} else if( action.equalsIgnoreCase( shuffle ) ){
				shuffle( players );
			} else if( action.equalsIgnoreCase( finals ) ){
				top = new PriorityQueue<Player>();
				for( Player p : players ){
					System.out.println( "Enter score for " + p.name() );
					score = in.nextInt();
					p.setPoints( score );
					top.add(p);
				}				
				System.out.println( "Enter number of players for the finals:" );
				n = in.nextInt();
				in.nextLine();
				t = new ArrayList<Player>();
				for( int i = 0 ; i < n ; i++ ){
					t.add( top.poll() );
				}
				shuffle( t);
			} else if( action.equalsIgnoreCase( list ) ){
				for( Player p : players ){
					System.out.println( p );
				}
			} else {
				System.out.println("What?");
			}
			action = action( in, prompt );
		}
	}
	
	public static String action( Scanner in, String prompt ){
		System.out.println( prompt );
		return in.nextLine();
	}
	
	public static ArrayList<Player> getPlayers(Scanner in){
		System.out.println("How many players are we adding? ");
		int n = in.nextInt();
		ArrayList<Player> p = new ArrayList<Player>();
		in.nextLine();
		for( int i = 0 ; i < n ; i++ ){
			p.add( getPlayer( in ) );
		}
		return p;
	}
	
	public static Player getPlayer( Scanner in ){
		System.out.println( "Who is playing?" );
		String name = in.nextLine();
		System.out.println( "Which figher are they playing as?" );
		String fighter = in.nextLine();
		return new Player( name, fighter );
	}
	
	public static void printMatchSets( Scanner in, ArrayList<Player> players ){

	}

	public static void shuffle(ArrayList<Player> players){
		ArrayList<Player> t = new ArrayList<Player>();
		Player temp;
		int r, lb = 0;
		for( Player p : players ){
			t.add( p );
		}
		while( !t.isEmpty() ){
			r = gen.nextInt( t.size() );
			System.out.println( t.remove(r) );
			lb++;
			if( lb % 4 == 0 ){
				System.out.println();
			}
		}
	}
}
