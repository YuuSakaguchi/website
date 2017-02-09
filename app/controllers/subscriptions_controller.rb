class SubscriptionsController < ApplicationController

  protect_from_forgery :except => :webhook

  def create
    # Amount in cents
    @amount = 900
    @subscription = Subscription.new

    @subscription.user_name = params[:name]
    @subscription.user_email = params[:email]
    @subscription.user_website = params[:website]
    @subscription.anon_contrib = params[:anon]

    token_type = params[:token_type]
    if token_type == "source_bitcoin"

      customer = Stripe::Customer.create(
        :email => params[:email],
        :source => params[:token]
      )

      charge = Stripe::Charge.create(
        :customer    => customer.id,
        :amount => @amount,
        :currency => "usd",
        :source => params[:token],
        :description => params[:email]
      )

      if customer && charge
        @subscription.user_stripe_id = customer.id
        @subscription.payment_type = "bitcoin"
        @subscription.save
        render :json => @subscription
      else
        render :json => {:error => {:message => "There was an error processing your payment. Please try again."}}
      end
    else
      customer = Stripe::Customer.create(
        :email => params[:email],
        :source  => params[:token],
        :plan => "2",
      )

      if customer
        @subscription.user_stripe_id = customer.id
        subscription_data = customer.subscriptions.data[0]
        @subscription.stripe_id = subscription_data.id
        @subscription.stripe_name = subscription_data.plan.name
        @subscription.payment_type = "credit_card"
        @subscription.save
        render :json => @subscription
      else
        render :json => {:error => {:message => "There was an error processing your payment. Please try again."}}
      end
    end
  end

  def destroy
    subscription = Stripe::Subscription.retrieve(@subscription.stripe_id)
    subscription.delete(:at_period_end => true)
  end

  def webhook
    event_json = JSON.parse(request.body.read)
    event = Stripe::Event.retrieve(event_json["id"])
    name = event.type

    case name
    when "customer.subscription.deleted"
      @subscription = Subscription.find_by_user_stripe_id(event.data["object"]["customer"])
      @subscription.canceled = true
    when "customer.subscription.created"
      require 'date'
      @subscription = Subscription.find_by_user_stripe_id(event.data["object"]["customer"])
      @subscription.active_until = Time.at(event.data["object"]["current_period_end"]).to_datetime
    when "charge.succeeded"
      @subscription = Subscription.find_by_user_stripe_id(event.data["object"]["customer"])
      @subscription.active_until = Time.now + 1.year
    end

    if @subscription
      @subscription.save
    end

    render :status => 200
  end

end
