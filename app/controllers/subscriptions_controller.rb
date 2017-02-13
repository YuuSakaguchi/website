class SubscriptionsController < ApplicationController

  include ExtensionServerHelper

  protect_from_forgery :except => :webhook

  before_action only: [:create, :destroy] {
    authenticate_pro_user
    @subscription = @user.subscription
  }

  def create
    @amount = 3000 # Amount in cents

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
        @subscription = @user.build_subscription
        @user.stripe_id = customer.id
        @subscription.payment_type = "bitcoin"
        @subscription.save
        @user.save
        render :json => @subscription
      else
        render :json => {:error => {:message => "There was an error processing your payment. Please try again."}}, :status => 500
      end
    else
      customer = Stripe::Customer.create(
        :email => params[:email],
        :source  => params[:token],
        :plan => "2",
      )

      if customer
        @user.stripe_id = customer.id
        @subscription = @user.build_subscription
        subscription_data = customer.subscriptions.data[0]
        @subscription.stripe_id = subscription_data.id
        @subscription.stripe_name = subscription_data.plan.name
        @subscription.payment_type = "credit_card"
        @subscription.save
        @user.save
        render :json => @subscription
      else
        render :json => {:error => {:message => "There was an error processing your payment. Please try again."}}, :status => 500
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
      @user = ProUser.find_by_stripe_id(event.data["object"]["customer"])
      @user.subscription.canceled = true
    when "customer.subscription.created"
      require 'date'
      @user = ProUser.find_by_stripe_id(event.data["object"]["customer"])
      @user.subscription.active_until = Time.at(event.data["object"]["current_period_end"]).to_datetime
      activate_extensions
    when "charge.succeeded"
      @user = ProUser.find_by_stripe_id(event.data["object"]["customer"])
      @user.subscription.active_until = Time.now + 1.year
      activate_extensions
    end

    if @user
      @user.subscription.save
      @user.save
    end

    render :status => 200
  end

  private

  def activate_extensions
    ExtensionServerHelper.set_user_pro_enabled(@user, true)
  end

  def disable_extensions
    ExtensionServerHelper.set_user_pro_enabled(@user, false)
  end

end
